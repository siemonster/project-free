#!/bin/bash

sqlite3 /data/data.db "update sites set host='$HOST' where site_id=1;"

export HOSTNAME=$HOST

hostname $HOST

exec /bin/sh -c /startup.sh