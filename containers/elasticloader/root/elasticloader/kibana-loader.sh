#!/bin/bash

while [ ! "$(curl http://es-client:9200)" ]; do
    sleep 1
done

elasticdump --input=bro-mapping.json --output=http://es-client:9200/@bro-meta --type=mapping
elasticdump --input=bro-data.json --output=http://es-client:9200/@bro-meta --type=data
elasticdump --input=kibi-mapping.json --output=http://es-client:9200/.kibi --type=mapping
elasticdump --input=kibi-data.json --output=http://es-client:9200/.kibi --type=data
