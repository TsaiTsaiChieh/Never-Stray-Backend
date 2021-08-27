#!/bin/sh
echo "Wait for Never-Stay API to start"
sleep 5;
echo "Run migration ..."
yarn typeorm migration:run
echo "=== END ==="
