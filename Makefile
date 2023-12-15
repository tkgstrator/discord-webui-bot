PHONY: up
up:
	docker compose up --build

PHONY: build
build:
	docker build --push -t tkgling/stable-diffusion-webui-bot:latest .
