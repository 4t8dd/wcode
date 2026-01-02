#!/usr/bin/env bash
# Privacy-hardened OpenCode test runner
# Run this script to test the privacy-hardened build

cd "$(dirname "$0")/packages/opencode"
exec bun run src/index.ts "$@"
