.PHONY: client_lib build_client build
.DEFAULT_GOAL := build


client_lib:
	neu update

build_client: client_lib
	cd ui; npm run build

build: build_client
	neu build
	chmod +x -R dist
