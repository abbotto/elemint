#!/usr/bin/env sh

# Check for lint errors
npm run lint

# Compile the 'test' build
npm run build 'test'

# Initiate the test-runner
karma start test/config/karma.js

# Compile the `dist` build
npm run build
