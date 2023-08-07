## Stable Journey Bot

## Get started

Set additional launch flag for stable diffusion webui

- `--api`

## Installation

### Requirements

- NodeJS 18.17.0
- Docker
- Docker compose

### Environment values

```
API_URL=http://localhost:7860/sdapi
API_VER=v1
```

### Development

```zsh
git clone https://github.com/tkgstrator/stable-journey-bot
git checkout develop
cd stable-journey-bot
yarn dev
```

### Production

```zsh
docker compose up --build
```
