#!/bin/bash

mkdir -p /opt/containers/app/nginx

cp nginx.conf /opt/containers/app/nginx

cd /root/app

node server.js

