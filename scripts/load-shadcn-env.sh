#!/bin/sh
set -a
if [ -f ./.env.shadcn ]; then
  . ./.env.shadcn
fi
set +a

exec "$@"
