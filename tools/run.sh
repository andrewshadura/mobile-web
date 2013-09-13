#!/bin/bash

#
# Build and deploy process of the client application (ie. origin/app)
#

cd /www/rekola-dev/client
git fetch
git reset origin/app --hard
npm install
grunt --no-color
