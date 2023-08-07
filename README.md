## Stable Journey Bot

Discord bot client for AUTOMATIC1111's [stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui).

### Features

- [x] `sdapi/v1/txt2img`
- [ ] `sdapi/v1/img2img`
- [ ] `sdapi/v1/progress`
- [ ] `sdapi/v1/upscalers`
- [ ] `sdapi/v1/interrupt`
- [ ] `sdapi/v1/skip`
- [ ] `sdapi/v1/options`
- [ ] `sdapi/v1/samplers`
- [ ] `sdapi/v1/sd-va`
- [x] `sdapi/v1/sd-models`
- [ ] `sdapi/v1/system-info/status`
- [ ] `sdapi/v1/refresh-checkpoints`
- [ ] `sdapi/v1/refresh-vae`

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
