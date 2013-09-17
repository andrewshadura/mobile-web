#!/bin/bash

#
# Build and deploy process of the client application (ie. origin/app)
#

cd /www/rekola-live/client
npm install
grunt --no-color
