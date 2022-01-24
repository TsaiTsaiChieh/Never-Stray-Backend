#!/bin/sh
echo "Wait for all services to start"
sleep 10;
echo "Run migration ..."
yarn typeorm migration:run
echo "Initializing area data ..."
yarn ts-node ./src/scripts/init-area.ts
echo "=== END ==="
