#!/bin/bash

# Script to increase macOS file descriptor limit for Next.js development
# This addresses the "EMFILE: too many open files" error

echo "Increasing file descriptor limit for current shell..."
ulimit -n 65536

echo "Current file descriptor limit: $(ulimit -n)"
echo ""
echo "Starting Next.js dev server..."

npm run dev
