#!/bin/bash

sqlite3 /data/data.db "update sites set host='$thishost' where site_id=1;"
exec /bin/sh -c /startup.sh