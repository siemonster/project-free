#!/bin/bash

source /root/mo

# to create new certificate run in container:
# cd /root/certbot; ./certbot-auto certonly --webroot -n --email alexandramourzina@gmail.com --agree-tos -w /tmp -d app.elocutionlabs.com


cd /root/certbot
./letsencrypt-auto renew

if [ -d /etc/letsencrypt/live ]; then
  cd /etc/letsencrypt/live;
  export ssl_hosts=( */ )

  if [ -d ${ssl_hosts[0]} ]; then
    unset ssl_hosts[0]
  fi

  cat /etc/nginx/conf.d/https.conf.template | mo > /etc/nginx/conf.d/https.conf
fi