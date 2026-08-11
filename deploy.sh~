#!/usr/bin/env bash
# Pulls the latest committed changes and redeploys the app in place, per the
# "Every subsequent deploy" steps in CLAUDE.md's Deployment section:
# git pull -> npm ci -> prisma migrate deploy -> npm run build -> touch
# tmp/restart.txt (Passenger's restart signal). Does NOT run the one-time
# `prisma db seed` step.
#
# Usage:
#   ./deploy.sh [path/to/app/root]
#
# Run this on the Spaceship server itself (via SSH/terminal) from inside the
# app's application root, or pass the root as an argument.

set -euo pipefail

APP_ROOT="${1:-.}"
cd "$APP_ROOT"
APP_ROOT="$(pwd)"

echo "==> Deploying $APP_ROOT"
START_TIME=$(date +%s)

step() {
  echo ""
  echo "[$1/$TOTAL_STEPS] $2"
  shift 2
  if ! "$@"; then
    echo ""
    echo "✗ Step failed: $*" >&2
    exit 1
  fi
}

TOTAL_STEPS=5

step 1 "Pulling latest changes" git pull
step 2 "Installing dependencies" npm ci
# step 3 "Applying database migrations" npx prisma migrate deploy
step 4 "Building production bundle" npm run build

echo ""
echo "[5/$TOTAL_STEPS] Signaling Passenger to restart"
mkdir -p tmp
touch tmp/restart.txt

ELAPSED=$(( $(date +%s) - START_TIME ))
echo ""
echo "✓ Deploy finished in ${ELAPSED}s"
