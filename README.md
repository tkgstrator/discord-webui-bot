## Stable Journey Bot

Discord bot client for AUTOMATIC1111's [stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui).

### Features

#### Discord Bot

- [ ] Generate(Txt2Img)
    - [ ] Prompt
    - [ ] Negative prompt
    - [ ] Batch size
- [x] Status(Options)
- [x] Switch(Options)
    - [x] Checkpoint
    - [ ] Vae
    - [x] CLIP_stop_at_last_layers
    - [x] eta_noise_seed_delta
- [ ] Random(Txt2Img)
    - [ ] NSFW
    - [ ] SFW
- [ ] System info
- [ ] Default parameters

#### SDAPI

- [x] `sdapi/v1/txt2img`
- [ ] `sdapi/v1/img2img`
- [x] `sdapi/v1/progress`
- [x] `sdapi/v1/upscalers`
- [ ] `sdapi/v1/interrupt`
- [ ] `sdapi/v1/skip`
- [x] `sdapi/v1/options`
- [x] `sdapi/v1/samplers`
- [x] `sdapi/v1/sd-vae`
- [x] `sdapi/v1/sd-models`
- [x] `sdapi/v1/system-info/status`
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
yarn install
yarn dev
```

### Production

```zsh
docker compose up --build
```
