---
title: 'Self-Hosting AI Models: Complete Infrastructure Guide'
description: 'Run Llama, Mistral, and other open source models on your own infrastructure with full privacy and control'
difficulty: 'Advanced'
readTime: '45 min'
author: 'Botsmann Team'
publishedAt: '2026-01-12'
tags: ['self-hosting', 'llama', 'ollama', 'vllm', 'docker', 'gpu']
prerequisites: ['Linux server administration', 'Docker knowledge', 'Understanding of AI models']
category: 'infrastructure'
published: true
---

## Self-Hosting AI Models

Run powerful open-source AI models on your own infrastructure. This guide covers everything from single-GPU setups to production clusters.

## Why Self-Host?

| Benefit        | Details                                        |
| -------------- | ---------------------------------------------- |
| **Privacy**    | Data never leaves your infrastructure          |
| **Cost**       | No per-token charges after hardware investment |
| **Control**    | Custom models, fine-tuning, no rate limits     |
| **Latency**    | Lower latency for on-premise deployments       |
| **Compliance** | Meet data residency requirements               |

---

## Hardware Requirements

### Minimum Specs by Model

| Model          | Parameters | VRAM Required | RAM (CPU) | Recommended GPU |
| -------------- | ---------- | ------------- | --------- | --------------- |
| Llama 3.2 3B   | 3B         | 6GB           | 8GB       | RTX 3060        |
| Mistral 7B     | 7B         | 16GB          | 32GB      | RTX 4090        |
| Llama 3.1 8B   | 8B         | 16GB          | 32GB      | RTX 4090        |
| Llama 3.1 70B  | 70B        | 140GB         | 256GB     | 2x A100 80GB    |
| Llama 3.1 405B | 405B       | 810GB         | 1TB+      | 8x H100         |

### Quantization Reduces Requirements

| Quantization    | VRAM Reduction | Quality Loss |
| --------------- | -------------- | ------------ |
| FP16 (default)  | Baseline       | None         |
| INT8            | ~50%           | Minimal      |
| INT4 (GPTQ/AWQ) | ~75%           | Small        |
| GGUF Q4_K_M     | ~75%           | Small        |

**Example:** Llama 3.1 70B with INT4 → ~35GB VRAM (fits on 2x RTX 4090)

---

## Option 1: Ollama (Easiest)

Best for: Development, single-user, quick setup

### Installation

```bash
# Linux/macOS
curl -fsSL https://ollama.com/install.sh | sh

# Or with Docker
docker run -d --gpus all -v ollama:/root/.ollama -p 11434:11434 ollama/ollama
```

### Pull Models

```bash
# Llama 3.1 8B (default)
ollama pull llama3.1

# Llama 3.1 70B (needs ~40GB VRAM with Q4)
ollama pull llama3.1:70b

# Mistral 7B
ollama pull mistral

# Code-specialized
ollama pull codellama:34b
```

### Use the API

```bash
curl http://localhost:11434/api/chat -d '{
  "model": "llama3.1",
  "messages": [{"role": "user", "content": "Hello!"}],
  "stream": false
}'
```

### OpenAI-Compatible Endpoint

```javascript
import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'http://localhost:11434/v1',
  apiKey: 'ollama', // Required but unused
});

const response = await client.chat.completions.create({
  model: 'llama3.1',
  messages: [{ role: 'user', content: 'Hello!' }],
});
```

---

## Option 2: vLLM (Production)

Best for: High throughput, production deployments, multi-user

### Why vLLM?

- **PagedAttention:** 24x higher throughput than naive implementation
- **Continuous batching:** Efficiently handles concurrent requests
- **OpenAI-compatible API:** Drop-in replacement

### Installation

```bash
pip install vllm

# Or with Docker
docker run --runtime nvidia --gpus all \
  -v ~/.cache/huggingface:/root/.cache/huggingface \
  -p 8000:8000 \
  vllm/vllm-openai:latest \
  --model meta-llama/Meta-Llama-3.1-8B-Instruct
```

### Serve a Model

```bash
python -m vllm.entrypoints.openai.api_server \
  --model meta-llama/Meta-Llama-3.1-8B-Instruct \
  --tensor-parallel-size 1 \
  --max-model-len 8192 \
  --gpu-memory-utilization 0.9
```

### For Multi-GPU (70B model)

```bash
python -m vllm.entrypoints.openai.api_server \
  --model meta-llama/Meta-Llama-3.1-70B-Instruct \
  --tensor-parallel-size 2 \
  --max-model-len 4096 \
  --gpu-memory-utilization 0.95
```

### Production Docker Compose

```yaml
# docker-compose.yml
version: '3.8'
services:
  vllm:
    image: vllm/vllm-openai:latest
    runtime: nvidia
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities: [gpu]
    ports:
      - '8000:8000'
    volumes:
      - huggingface-cache:/root/.cache/huggingface
    command: >
      --model meta-llama/Meta-Llama-3.1-8B-Instruct
      --tensor-parallel-size 1
      --max-model-len 8192
    environment:
      - HUGGING_FACE_HUB_TOKEN=${HF_TOKEN}
    restart: unless-stopped

volumes:
  huggingface-cache:
```

---

## Option 3: Text Generation Inference (TGI)

Best for: HuggingFace ecosystem, Flash Attention optimizations

### Run with Docker

```bash
docker run --gpus all --shm-size 1g -p 8080:80 \
  -v /data:/data \
  ghcr.io/huggingface/text-generation-inference:latest \
  --model-id meta-llama/Meta-Llama-3.1-8B-Instruct \
  --max-input-length 4096 \
  --max-total-tokens 8192
```

### API Usage

```bash
curl http://localhost:8080/generate \
  -X POST \
  -H 'Content-Type: application/json' \
  -d '{"inputs": "What is AI?", "parameters": {"max_new_tokens": 100}}'
```

---

## Production Architecture

### Single Server Setup

```
┌─────────────────────────────────────────────────────────┐
│                    Your Server                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   Nginx     │  │   vLLM/TGI  │  │   Redis     │     │
│  │  (Reverse   │->│  (Model     │->│  (Queue/    │     │
│  │   Proxy)    │  │   Server)   │  │   Cache)    │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
│         │                │                              │
│         │         ┌──────┴──────┐                      │
│         │         │   GPU(s)    │                      │
│         │         └─────────────┘                      │
└─────────│───────────────────────────────────────────────┘
          │
    ┌─────┴─────┐
    │ Cloudflare│
    │   (CDN)   │
    └───────────┘
```

### Nginx Configuration

```nginx
# /etc/nginx/sites-available/llm
upstream vllm {
    server 127.0.0.1:8000;
    keepalive 32;
}

server {
    listen 443 ssl http2;
    server_name llm.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/llm.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/llm.yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://vllm;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;

        # For streaming
        proxy_buffering off;
        proxy_cache off;
    }
}
```

---

## Multi-GPU and Clustering

### Tensor Parallelism (Single Node)

Split one model across multiple GPUs:

```bash
# 70B model on 2x A100
python -m vllm.entrypoints.openai.api_server \
  --model meta-llama/Meta-Llama-3.1-70B-Instruct \
  --tensor-parallel-size 2
```

### Load Balancing (Multiple Nodes)

```yaml
# docker-compose.yml for load balancing
version: '3.8'
services:
  nginx:
    image: nginx:alpine
    ports:
      - '8000:8000'
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - vllm1
      - vllm2

  vllm1:
    image: vllm/vllm-openai:latest
    runtime: nvidia
    # ... config

  vllm2:
    image: vllm/vllm-openai:latest
    runtime: nvidia
    # ... config
```

```nginx
# nginx.conf
upstream vllm_cluster {
    least_conn;
    server vllm1:8000;
    server vllm2:8000;
}

server {
    listen 8000;
    location / {
        proxy_pass http://vllm_cluster;
    }
}
```

---

## Monitoring

### Prometheus Metrics

vLLM exposes metrics at `/metrics`:

```yaml
# prometheus.yml
scrape_configs:
  - job_name: 'vllm'
    static_configs:
      - targets: ['localhost:8000']
```

Key metrics to monitor:

- `vllm:num_requests_running` - Active requests
- `vllm:num_requests_waiting` - Queue depth
- `vllm:gpu_cache_usage_perc` - GPU memory usage
- `vllm:avg_generation_throughput` - Tokens/second

### Grafana Dashboard

```json
{
  "panels": [
    {
      "title": "Requests per Second",
      "targets": [
        {
          "expr": "rate(vllm:num_requests_total[1m])"
        }
      ]
    },
    {
      "title": "GPU Memory Usage",
      "targets": [
        {
          "expr": "vllm:gpu_cache_usage_perc"
        }
      ]
    }
  ]
}
```

---

## Cost Comparison

### Hardware Investment

| Setup       | Hardware     | One-time Cost | Monthly (Power/Hosting) |
| ----------- | ------------ | ------------- | ----------------------- |
| Dev         | RTX 4090     | $1,600        | $50 (home)              |
| Small Prod  | 2x RTX 4090  | $3,500        | $200 (colo)             |
| Medium Prod | 2x A100 80GB | $30,000       | $500 (colo)             |
| Large Prod  | 8x H100      | $300,000      | $3,000 (colo)           |

### Cloud GPU Rental

| Provider | GPU          | $/Hour | Best For    |
| -------- | ------------ | ------ | ----------- |
| RunPod   | RTX 4090     | $0.44  | Development |
| Lambda   | A100 80GB    | $1.29  | Training    |
| AWS      | p4d.24xlarge | $32.77 | Enterprise  |

### Break-even Analysis

**Scenario:** 1M tokens/day

| Option                   | Monthly Cost |
| ------------------------ | ------------ |
| OpenAI GPT-4o            | ~$2,500      |
| Self-hosted (RunPod)     | ~$320        |
| Self-hosted (owned 4090) | ~$50         |

Break-even for owned hardware: ~2 months

---

## Security Considerations

### API Authentication

```python
# Add to vLLM startup
--api-key your-secret-key
```

### Network Security

```bash
# Only allow internal access
ufw allow from 10.0.0.0/8 to any port 8000
ufw deny 8000
```

### Model Access

```bash
# Use HuggingFace token for gated models
export HUGGING_FACE_HUB_TOKEN=hf_...
```

---

## Troubleshooting

### Out of Memory

```bash
# Reduce context length
--max-model-len 4096

# Use quantization
--quantization awq

# Reduce batch size
--max-num-seqs 32
```

### Slow Inference

```bash
# Enable Flash Attention
--enable-flashinfer

# Use continuous batching
--disable-log-requests  # Reduces overhead
```

### Model Loading Fails

```bash
# Check disk space
df -h

# Verify GPU access
nvidia-smi

# Check HuggingFace cache
ls ~/.cache/huggingface/hub/
```

---

## Next Steps

- Set up **fine-tuning** with LoRA/QLoRA
- Implement **RAG** with your self-hosted model
- Add **model routing** (different models for different tasks)
- Configure **auto-scaling** based on load

See our [Production Deployment Guide](/knowledge/guides/production-deployment) for scaling to enterprise workloads.
