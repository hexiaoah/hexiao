#!/usr/bin/env bash

npm update @2dfire/union-scripts

npm install
NODE_ENV=production node ./node_modules/@2dfire/union-scripts/bin/union-scripts build
NODE_ENV=production node ./node_modules/@2dfire/union-scripts/bin/union-scripts deploy $1
