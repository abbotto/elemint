#!/usr/bin/env bash

# Check for lint errors
npm run lint

# Compile the 'test' build
npm run build 'test'

# Initiate the test-runner
karma start cfg/karma.js

# Compile the `dist` build
npm run build
