#!/usr/bin/env bash
# Exercise the same standalone entrypoint and assembled assets production ships.
set -euo pipefail
pnpm run build
mkdir -p .next/standalone/public .next/standalone/.next/static
cp -a public/. .next/standalone/public/
cp -a .next/static/. .next/standalone/.next/static/
exec env HOSTNAME=127.0.0.1 PORT=3919 node .next/standalone/server.js
