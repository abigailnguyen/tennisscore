SERVICE=app
docker compose run --rm \
    -v $(pwd):/app \
    ${SERVICE} \
    "$@"