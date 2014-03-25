#!/bin/bash

#
# Build and deploy process of the client application (ie. origin/app)
#

cd /www/rekola-mobile-dev
npm install
grunt --no-color
