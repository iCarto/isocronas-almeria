# Isocronas-Almería

## HACKING

```shell
# Name of the proyect. Used for virtualenv names and other stuff
PROJECT_NAME=isocronas_almeria

./scripts/install.sh
# Get `fixtures` folder and place it in `.cache/fixtures`. Remember keep it up to date.
docker compose up -d
./scripts/reset_and_create_db.sh

workon "${PROJECT_NAME}"
./scripts/start.sh -f
```

## Development and Contributions

See in the docs folder [CONTRIBUTING](./docs/CONTRIBUTING.md) and [development](./docs/development.md)
