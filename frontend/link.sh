#!/usr/bin/env bash

export PS1='\u(npm):\w$ '
export NODE_MODULES_BIN=./node_modules/.bin/
export PATH=$PATH:$NODE_MODULES_BIN

exec /bin/bash
