#!/bin/bash

# Skip builds from GitHub Actions CI
if [[ "$VERCEL_GIT_COMMIT_MESSAGE" == *"ci:"* ]] || [[ "$VERCEL_GIT_COMMIT_MESSAGE" == *"fix(ci)"* ]]; then
  echo "🚫 Skipping Vercel build - CI commit detected"
  exit 0
fi

# Only build in production if commit message contains [build]
if [[ $VERCEL_ENV == "production" ]]; then 
  if echo "$VERCEL_GIT_COMMIT_MESSAGE" | grep -q "\[build\]"; then
    echo "Building - [build] tag found"
    exit 1
  else
    echo "Skipping build - no [build] tag"
    exit 0
  fi
else
  # Skip preview builds
  echo "Skipping preview build"
  exit 0
fi