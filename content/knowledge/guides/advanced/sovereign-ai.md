---
title: 'Sovereign AI: Run Models 100% On Your Own Hardware'
description: 'Complete guide to running AI with zero external dependencies - your GPUs, your data, your control'
difficulty: 'Advanced'
readTime: '50 min'
author: 'Botsmann Team'
publishedAt: '2026-01-12'
tags: ['sovereign', 'self-hosted', 'gpu', 'privacy', 'on-premise', 'air-gapped']
prerequisites: ['Linux administration', 'Basic networking', 'Understanding of AI models']
category: 'infrastructure'
published: true
---

## Sovereign AI: Complete Independence

Run AI models with **zero external API calls**. Your hardware, your data, your control. This guide covers everything from buying GPUs to deploying production-ready inference.

## Why Go Sovereign?

| Reason                | Details                                  |
| --------------------- | ---------------------------------------- |
| **Data Privacy**      | Sensitive data never leaves your network |
| **Compliance**        | Meet GDPR, HIPAA, financial regulations  |
| **No Rate Limits**    | Scale to your hardware capacity          |
| **No Vendor Lock-in** | Switch models anytime                    |
| **Cost at Scale**     | Cheaper than APIs at high volume         |
| **Air-Gapped**        | Works without internet connection        |

---

## What You Need: The Complete Stack

```
┌─────────────────────────────────────────────────────────────────┐
│                    SOVEREIGN AI STACK                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ APPLICATION LAYER                                           ││
│  │ Your App → API Gateway → Load Balancer                      ││
│  └─────────────────────────────────────────────────────────────┘│
│                           │                                      │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ INFERENCE LAYER                                             ││
│  │ vLLM / Ollama / TGI (OpenAI-compatible API)                ││
│  └─────────────────────────────────────────────────────────────┘│
│                           │                                      │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ MODEL LAYER                                                 ││
│  │ Llama 3.1 / Qwen 2.5 / Mistral / DeepSeek                  ││
│  └─────────────────────────────────────────────────────────────┘│
│                           │                                      │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ RUNTIME LAYER                                               ││
│  │ Docker + NVIDIA Container Toolkit                           ││
│  └─────────────────────────────────────────────────────────────┘│
│                           │                                      │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ OS LAYER                                                    ││
│  │ Ubuntu 22.04 LTS + NVIDIA Drivers                          ││
│  └─────────────────────────────────────────────────────────────┘│
│                           │                                      │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ HARDWARE LAYER                                              ││
│  │ GPU(s) + CPU + RAM + NVMe Storage                          ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Part 1: Hardware

### GPU Selection Guide

| GPU             | VRAM | Price (2026) | Max Model            | Use Case            |
| --------------- | ---- | ------------ | -------------------- | ------------------- |
| **RTX 4090**    | 24GB | $1,600       | 13B (FP16), 70B (Q4) | Best consumer value |
| **RTX 5090**    | 32GB | $2,000       | 22B (FP16), 70B (Q5) | Latest consumer     |
| **RTX 4090 x2** | 48GB | $3,200       | 34B (FP16), 70B (Q8) | Multi-GPU consumer  |
| **L40S**        | 48GB | $7,000       | 34B (FP16)           | Entry datacenter    |
| **A100 80GB**   | 80GB | $15,000      | 70B (FP16)           | Professional        |
| **H100 80GB**   | 80GB | $30,000      | 70B (FP16), fastest  | Enterprise          |

### What Model Sizes Need What VRAM

| Model Size | FP16 VRAM | INT8 VRAM | INT4 VRAM | Example Models           |
| ---------- | --------- | --------- | --------- | ------------------------ |
| 3B         | 6GB       | 3GB       | 2GB       | Llama 3.2 3B             |
| 7-8B       | 16GB      | 8GB       | 4GB       | Llama 3.1 8B, Mistral 7B |
| 13B        | 26GB      | 13GB      | 7GB       | CodeLlama 13B            |
| 34B        | 68GB      | 34GB      | 17GB      | CodeLlama 34B            |
| 70B        | 140GB     | 70GB      | 35GB      | Llama 3.1 70B            |
| 405B       | 810GB     | 405GB     | 200GB     | Llama 3.1 405B           |

### Recommended Builds

#### Starter Build (~$3,000)

Best for: Small teams, development, 7-13B models

| Component      | Spec              | Price  |
| -------------- | ----------------- | ------ |
| GPU            | RTX 4090 24GB     | $1,600 |
| CPU            | AMD Ryzen 9 7900X | $400   |
| RAM            | 64GB DDR5         | $200   |
| Storage        | 2TB NVMe Gen4     | $150   |
| Motherboard    | X670E             | $300   |
| PSU            | 1000W 80+ Gold    | $150   |
| Case + Cooling | Full tower        | $200   |

**Runs:** Llama 3.1 8B (full speed), 70B quantized (slower)

#### Production Build (~$8,000)

Best for: Medium teams, 70B models, high throughput

| Component         | Spec                           | Price  |
| ----------------- | ------------------------------ | ------ |
| GPUs              | 2x RTX 4090 24GB               | $3,200 |
| CPU               | AMD EPYC 7313P or Threadripper | $1,500 |
| RAM               | 128GB DDR5 ECC                 | $600   |
| Storage           | 4TB NVMe RAID                  | $400   |
| Motherboard       | Server/HEDT board              | $500   |
| PSU               | 1600W Titanium                 | $400   |
| Case              | Server chassis                 | $400   |
| NVLink (optional) | For tensor parallelism         | $500   |

**Runs:** Llama 3.1 70B (Q4), multiple 8B models simultaneously

#### Enterprise Build (~$70,000+)

Best for: Large teams, maximum quality, lowest latency

| Component     | Spec                | Price   |
| ------------- | ------------------- | ------- |
| GPUs          | 2x NVIDIA A100 80GB | $30,000 |
| Server        | Dell/HPE/Supermicro | $15,000 |
| RAM           | 512GB DDR5 ECC      | $2,000  |
| Storage       | 8TB NVMe RAID       | $2,000  |
| Networking    | 100GbE              | $1,000  |
| Redundant PSU | 2x 2000W            | $1,000  |

**Runs:** Llama 3.1 70B (FP16, full quality), 405B (quantized)

---

## Part 2: Software Setup

### Step 1: Operating System

Ubuntu Server 22.04 LTS is the standard for AI workloads.

```bash
# Fresh Ubuntu 22.04 LTS install
# Update system
sudo apt update && sudo apt upgrade -y

# Install essential tools
sudo apt install -y build-essential git curl wget htop nvtop
```

### Step 2: NVIDIA Drivers

```bash
# Add NVIDIA repository
sudo add-apt-repository ppa:graphics-drivers/ppa -y
sudo apt update

# Install latest driver (check nvidia.com for current version)
sudo apt install -y nvidia-driver-550

# Reboot
sudo reboot

# Verify installation
nvidia-smi
```

Expected output:

```
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 550.xx    Driver Version: 550.xx    CUDA Version: 12.4          |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|===============================+======================+======================|
|   0  NVIDIA GeForce ...  Off  | 00000000:01:00.0 Off |                  N/A |
|  0%   35C    P8    10W / 450W |      0MiB / 24576MiB |      0%      Default |
+-------------------------------+----------------------+----------------------+
```

### Step 3: Docker + NVIDIA Container Toolkit

```bash
# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# Install NVIDIA Container Toolkit
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | \
  sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg

curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | \
  sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
  sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list

sudo apt update
sudo apt install -y nvidia-container-toolkit
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker

# Verify GPU access in Docker
docker run --rm --gpus all nvidia/cuda:12.4.0-base-ubuntu22.04 nvidia-smi
```

### Step 4: Download Models (Offline)

For air-gapped deployments, download models on an internet-connected machine first:

```bash
# Install huggingface-cli
pip install huggingface-hub

# Download models to a portable drive
huggingface-cli download meta-llama/Meta-Llama-3.1-8B-Instruct \
  --local-dir /mnt/portable/models/llama-3.1-8b

huggingface-cli download meta-llama/Meta-Llama-3.1-70B-Instruct \
  --local-dir /mnt/portable/models/llama-3.1-70b

# For Ollama (GGUF format)
wget https://huggingface.co/TheBloke/Llama-3.1-8B-Instruct-GGUF/resolve/main/llama-3.1-8b-instruct.Q4_K_M.gguf \
  -O /mnt/portable/models/llama-3.1-8b-q4.gguf
```

Transfer the `/mnt/portable/models` directory to your air-gapped server.

---

## Part 3: Inference Server Options

### Option A: Ollama (Easiest)

Best for: Development, simple deployments, GGUF models

```bash
# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# For air-gapped: copy the binary and models manually
# Create model from downloaded GGUF
cat > Modelfile << 'EOF'
FROM /path/to/llama-3.1-8b-q4.gguf
PARAMETER temperature 0.7
PARAMETER num_ctx 8192
SYSTEM You are a helpful AI assistant.
EOF

ollama create llama3.1 -f Modelfile

# Start server
ollama serve

# Test
curl http://localhost:11434/api/chat -d '{
  "model": "llama3.1",
  "messages": [{"role": "user", "content": "Hello!"}],
  "stream": false
}'
```

### Option B: vLLM (Production)

Best for: High throughput, production, OpenAI-compatible API

```bash
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
      - "8000:8000"
    volumes:
      - /path/to/models:/models
    command: >
      --model /models/llama-3.1-8b
      --tensor-parallel-size 1
      --max-model-len 8192
      --gpu-memory-utilization 0.9
    restart: unless-stopped
```

```bash
docker compose up -d

# Test (OpenAI-compatible)
curl http://localhost:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "/models/llama-3.1-8b",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

### Option C: Text Generation Inference (TGI)

Best for: HuggingFace ecosystem, Flash Attention

```bash
docker run --gpus all --shm-size 1g -p 8080:80 \
  -v /path/to/models:/data \
  ghcr.io/huggingface/text-generation-inference:latest \
  --model-id /data/llama-3.1-8b \
  --max-input-length 4096 \
  --max-total-tokens 8192
```

---

## Part 4: Multi-GPU Setup

### Tensor Parallelism (One Model, Multiple GPUs)

Split a large model across GPUs:

```bash
# vLLM with 2 GPUs for 70B model
docker run --gpus all -p 8000:8000 \
  -v /path/to/models:/models \
  vllm/vllm-openai:latest \
  --model /models/llama-3.1-70b \
  --tensor-parallel-size 2 \
  --max-model-len 4096
```

### Pipeline Parallelism (Different Models)

Run different models on different GPUs:

```yaml
# docker-compose.yml
version: '3.8'
services:
  llama-8b:
    image: vllm/vllm-openai:latest
    runtime: nvidia
    environment:
      - CUDA_VISIBLE_DEVICES=0
    ports:
      - '8001:8000'
    volumes:
      - /models:/models
    command: --model /models/llama-3.1-8b

  mistral-7b:
    image: vllm/vllm-openai:latest
    runtime: nvidia
    environment:
      - CUDA_VISIBLE_DEVICES=1
    ports:
      - '8002:8000'
    volumes:
      - /models:/models
    command: --model /models/mistral-7b
```

---

## Part 5: Model Selection Guide

### By Use Case

| Use Case              | Recommended Model | Size    | Notes                |
| --------------------- | ----------------- | ------- | -------------------- |
| **General Chat**      | Llama 3.1 8B      | 8B      | Best balance         |
| **Complex Reasoning** | Llama 3.1 70B     | 70B     | Near GPT-4 quality   |
| **Code Generation**   | DeepSeek Coder V2 | 16B     | Specialized for code |
| **Long Context**      | Qwen 2.5 72B      | 72B     | 128K context         |
| **Multilingual**      | Qwen 2.5          | Various | 29 languages         |
| **Embeddings**        | nomic-embed-text  | 137M    | Fast, accurate       |
| **Vision**            | Llama 3.2 Vision  | 11B     | Image understanding  |

### Model Licenses

| Model     | License             | Commercial Use        |
| --------- | ------------------- | --------------------- |
| Llama 3.1 | Llama 3.1 Community | Yes (with conditions) |
| Mistral   | Apache 2.0          | Yes                   |
| Qwen 2.5  | Qwen License        | Yes                   |
| DeepSeek  | MIT                 | Yes                   |
| Gemma 2   | Gemma Terms         | Yes (with conditions) |

---

## Part 6: Air-Gapped Deployment

For maximum security, deploy with zero internet access.

### Preparation (Internet-Connected Machine)

```bash
# 1. Download all Docker images
docker pull vllm/vllm-openai:latest
docker pull nginx:alpine
docker pull prom/prometheus:latest
docker pull grafana/grafana:latest

# Save to tar files
docker save vllm/vllm-openai:latest > vllm.tar
docker save nginx:alpine > nginx.tar

# 2. Download models (see Part 2, Step 4)

# 3. Download all dependencies
# Create requirements.txt with all Python packages
pip download -r requirements.txt -d ./packages/

# 4. Transfer everything via USB/secure transfer
```

### Deployment (Air-Gapped Server)

```bash
# 1. Load Docker images
docker load < vllm.tar
docker load < nginx.tar

# 2. Copy models to /opt/models

# 3. Start services
docker compose up -d

# 4. Verify (no external calls)
tcpdump -i any -c 100  # Should show only local traffic
```

### Network Isolation

```bash
# Block all outbound traffic except local
iptables -A OUTPUT -o lo -j ACCEPT
iptables -A OUTPUT -d 10.0.0.0/8 -j ACCEPT
iptables -A OUTPUT -d 172.16.0.0/12 -j ACCEPT
iptables -A OUTPUT -d 192.168.0.0/16 -j ACCEPT
iptables -A OUTPUT -j DROP
```

---

## Part 7: Production Architecture

### Complete Docker Compose

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  # Reverse proxy with SSL
  nginx:
    image: nginx:alpine
    ports:
      - '443:443'
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./certs:/etc/nginx/certs
    depends_on:
      - vllm
    restart: unless-stopped

  # Main inference server
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
    volumes:
      - /opt/models:/models
    command: >
      --model /models/llama-3.1-8b
      --api-key ${API_KEY}
      --max-model-len 8192
      --gpu-memory-utilization 0.9
    restart: unless-stopped

  # Monitoring
  prometheus:
    image: prom/prometheus:latest
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    ports:
      - '9090:9090'
    restart: unless-stopped

  grafana:
    image: grafana/grafana:latest
    volumes:
      - grafana_data:/var/lib/grafana
    ports:
      - '3000:3000'
    restart: unless-stopped

volumes:
  prometheus_data:
  grafana_data:
```

### Nginx Configuration

```nginx
# nginx.conf
events {
    worker_connections 1024;
}

http {
    upstream vllm {
        server vllm:8000;
        keepalive 32;
    }

    server {
        listen 443 ssl http2;
        server_name ai.internal;

        ssl_certificate /etc/nginx/certs/server.crt;
        ssl_certificate_key /etc/nginx/certs/server.key;

        # API key validation
        location / {
            if ($http_authorization != "Bearer ${API_KEY}") {
                return 401;
            }

            proxy_pass http://vllm;
            proxy_http_version 1.1;
            proxy_set_header Connection "";

            # For streaming
            proxy_buffering off;
            proxy_cache off;
            chunked_transfer_encoding on;
        }
    }
}
```

---

## Part 8: Cost Analysis

### One-Time Hardware Costs

| Setup                | Hardware Cost | Runs                     |
| -------------------- | ------------- | ------------------------ |
| Starter (1x 4090)    | $3,000        | 8B models, 70B quantized |
| Production (2x 4090) | $8,000        | 70B quantized well       |
| Enterprise (2x A100) | $70,000       | 70B full quality         |

### Monthly Operating Costs

| Item         | Starter   | Production | Enterprise |
| ------------ | --------- | ---------- | ---------- |
| Power (24/7) | $50       | $100       | $300       |
| Colocation   | $0 (home) | $150       | $500       |
| Cooling      | Included  | $50        | Included   |
| Internet     | $50       | $100       | $200       |
| **Total**    | **$100**  | **$400**   | **$1,000** |

### Power Consumption

| GPU      | TDP  | Actual Load | Cost/Month |
| -------- | ---- | ----------- | ---------- |
| RTX 4090 | 450W | ~350W       | $25        |
| RTX 5090 | 575W | ~450W       | $32        |
| A100     | 400W | ~350W       | $25        |
| H100     | 700W | ~600W       | $43        |

_Assuming $0.10/kWh, 24/7 operation_

### Break-Even vs API Costs

**Scenario:** 10 million tokens/day

| Option                         | Monthly Cost |
| ------------------------------ | ------------ |
| OpenAI GPT-4o                  | $75,000      |
| Claude Sonnet                  | $45,000      |
| Self-hosted (Production build) | $400         |

**Break-even:** ~1 month after hardware purchase

### ROI Calculator

```
Daily tokens: 10,000,000
API cost (GPT-4o @ $2.50/1M input, $10/1M output):
  - Assuming 50/50 split: ~$62.50/day = $1,875/month

Self-hosted cost:
  - Hardware: $8,000 (one-time)
  - Monthly: $400

Break-even: $8,000 / ($1,875 - $400) = 5.4 months
After break-even: Save $1,475/month
```

---

## Part 9: Maintenance & Updates

### Model Updates

```bash
# Check for new model versions
# (On internet-connected machine)
huggingface-cli repo-info meta-llama/Meta-Llama-3.1-8B-Instruct

# Download new version
huggingface-cli download meta-llama/Meta-Llama-3.2-8B-Instruct \
  --local-dir /mnt/portable/models/llama-3.2-8b

# Transfer and deploy
# Update docker-compose.yml to point to new model
# Rolling restart
docker compose up -d --no-deps vllm
```

### System Updates

```bash
# Security updates (do regularly)
sudo apt update
sudo apt upgrade -y

# Driver updates (test first!)
# Download driver on separate machine
# Test in staging before production
```

### Monitoring Alerts

```yaml
# prometheus/alerts.yml
groups:
  - name: ai-server
    rules:
      - alert: GPUMemoryHigh
        expr: nvidia_gpu_memory_used_bytes / nvidia_gpu_memory_total_bytes > 0.95
        for: 5m
        labels:
          severity: warning

      - alert: GPUTemperatureHigh
        expr: nvidia_gpu_temperature_celsius > 85
        for: 2m
        labels:
          severity: critical

      - alert: InferenceLatencyHigh
        expr: histogram_quantile(0.99, rate(vllm_request_latency_bucket[5m])) > 5
        for: 5m
        labels:
          severity: warning
```

---

## Part 10: Security Hardening

### Server Security

```bash
# Disable root SSH
sudo sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config

# SSH key only
sudo sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config

# Firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow from 10.0.0.0/8 to any port 22  # SSH from internal only
sudo ufw allow from 10.0.0.0/8 to any port 443 # API from internal only
sudo ufw enable
```

### API Security

```python
# Add to your application
import hashlib
import time

def validate_request(api_key: str, timestamp: str, signature: str, body: str) -> bool:
    """Validate HMAC signature for API requests."""
    # Check timestamp freshness (prevent replay)
    if abs(time.time() - float(timestamp)) > 300:  # 5 min window
        return False

    # Verify signature
    expected = hashlib.sha256(
        f"{api_key}{timestamp}{body}".encode()
    ).hexdigest()

    return signature == expected
```

### Audit Logging

```python
# Log all inference requests
import logging
from datetime import datetime

audit_logger = logging.getLogger('audit')
audit_logger.setLevel(logging.INFO)
handler = logging.FileHandler('/var/log/ai-audit.log')
audit_logger.addHandler(handler)

def log_request(user_id: str, model: str, tokens_in: int, tokens_out: int):
    audit_logger.info(f"{datetime.utcnow().isoformat()} | {user_id} | {model} | {tokens_in} | {tokens_out}")
```

---

## Quick Start Checklist

1. [ ] **Hardware:** Purchase GPU server or rent cloud GPU
2. [ ] **OS:** Install Ubuntu 22.04 LTS
3. [ ] **Drivers:** Install NVIDIA drivers + CUDA
4. [ ] **Docker:** Install Docker + NVIDIA Container Toolkit
5. [ ] **Models:** Download models (internet or offline)
6. [ ] **Inference:** Deploy vLLM or Ollama
7. [ ] **Security:** Configure firewall, SSL, API keys
8. [ ] **Monitoring:** Set up Prometheus + Grafana
9. [ ] **Test:** Verify API works and performance is acceptable
10. [ ] **Production:** Enable auto-restart, backups, alerts

---

## Summary: What It Takes

| Requirement         | Minimum     | Recommended         |
| ------------------- | ----------- | ------------------- |
| **Budget**          | $3,000      | $8,000+             |
| **Technical Skill** | Linux admin | DevOps experience   |
| **Setup Time**      | 1 day       | 1 week (production) |
| **Ongoing Effort**  | 2 hrs/month | 8 hrs/month         |

**Bottom line:** For ~$8,000 one-time + $400/month, you can run a 70B parameter model with quality approaching GPT-4, with complete data sovereignty and no external dependencies.

---

## Next Steps

- [Production Deployment](/knowledge/guides/production-deployment) - Scale to multiple servers
- [RAG Implementation](/knowledge/guides/rag-implementation) - Add custom knowledge
- [Fine-Tuning Guide](/knowledge/guides/fine-tuning) - Customize models for your use case
