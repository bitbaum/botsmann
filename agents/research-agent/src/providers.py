"""Multi-provider support for the research agent.

Supports:
- anthropic: Claude API (paid)
- groq: Groq API (free tier available)
- ollama: Local models (100% free)

Switch providers via RESEARCH_PROVIDER env var or config.
"""

import os
from dataclasses import dataclass
from enum import Enum
from typing import AsyncIterator


class Provider(Enum):
    ANTHROPIC = "anthropic"
    GROQ = "groq"
    OLLAMA = "ollama"


@dataclass
class ProviderConfig:
    name: Provider
    api_key: str | None
    base_url: str | None
    model: str


# Default models per provider
DEFAULT_MODELS = {
    Provider.ANTHROPIC: "claude-sonnet-5",
    Provider.GROQ: "llama-3.1-70b-versatile",
    Provider.OLLAMA: "phi3",  # Small, fast, works on most machines
}

# Base URLs
BASE_URLS = {
    Provider.ANTHROPIC: None,  # Uses default
    Provider.GROQ: "https://api.groq.com/openai/v1",
    Provider.OLLAMA: "http://localhost:11434/v1",
}


def get_provider_config() -> ProviderConfig:
    """Get provider configuration from environment."""
    provider_name = os.getenv("RESEARCH_PROVIDER", "ollama").lower()

    try:
        provider = Provider(provider_name)
    except ValueError:
        print(f"Unknown provider '{provider_name}', defaulting to ollama")
        provider = Provider.OLLAMA

    # Get API key based on provider
    api_key = None
    if provider == Provider.ANTHROPIC:
        api_key = os.getenv("ANTHROPIC_API_KEY")
    elif provider == Provider.GROQ:
        api_key = os.getenv("GROQ_API_KEY")
    # Ollama doesn't need an API key

    # Get model (allow override)
    model = os.getenv("RESEARCH_MODEL", DEFAULT_MODELS[provider])

    return ProviderConfig(
        name=provider,
        api_key=api_key,
        base_url=BASE_URLS[provider],
        model=model,
    )


async def query_provider(
    prompt: str,
    system_prompt: str,
    config: ProviderConfig,
) -> AsyncIterator[str]:
    """Query the configured provider and stream response."""

    if config.name == Provider.ANTHROPIC:
        # Use Claude Agent SDK
        from claude_agent_sdk import query, ClaudeAgentOptions

        options = ClaudeAgentOptions(
            system_prompt=system_prompt,
            allowed_tools=["WebSearch", "Read"],
        )
        async for chunk in query(prompt=prompt, options=options):
            yield str(chunk)

    elif config.name == Provider.OLLAMA:
        # Use native Ollama API
        import httpx

        payload = {
            "model": config.model,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt},
            ],
            "stream": True,
        }

        async with httpx.AsyncClient(timeout=120.0) as client:
            async with client.stream(
                "POST",
                "http://localhost:11434/api/chat",
                json=payload,
            ) as response:
                response.raise_for_status()
                async for line in response.aiter_lines():
                    if line:
                        try:
                            import json
                            chunk = json.loads(line)
                            content = chunk.get("message", {}).get("content", "")
                            if content:
                                yield content
                        except json.JSONDecodeError:
                            continue

    elif config.name == Provider.GROQ:
        # Use OpenAI-compatible API for Groq
        import httpx

        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {config.api_key}",
        }

        payload = {
            "model": config.model,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt},
            ],
            "stream": True,
        }

        async with httpx.AsyncClient(timeout=120.0) as client:
            async with client.stream(
                "POST",
                f"{config.base_url}/chat/completions",
                json=payload,
                headers=headers,
            ) as response:
                response.raise_for_status()
                async for line in response.aiter_lines():
                    if line.startswith("data: "):
                        data = line[6:]
                        if data == "[DONE]":
                            break
                        try:
                            import json
                            chunk = json.loads(data)
                            content = chunk["choices"][0]["delta"].get("content", "")
                            if content:
                                yield content
                        except (json.JSONDecodeError, KeyError, IndexError):
                            continue


def print_provider_info(config: ProviderConfig) -> None:
    """Print current provider configuration."""
    print(f"Provider: {config.name.value}")
    print(f"Model: {config.model}")
    if config.name == Provider.OLLAMA:
        print("Cost: FREE (local)")
    elif config.name == Provider.GROQ:
        print("Cost: FREE tier available")
    else:
        print("Cost: Paid API")
    print()
