#!/bin/bash

while [ ! "$(curl http://es-client:9200)" ]; do
    sleep 1
done

elasticdump --input=bro-mapping.json --output=http://es-client:9200/@bro-meta --type=mapping
elasticdump --input=bro-data.json --output=http://es-client:9200/@bro-meta --type=data
elasticdump --input=kibana-mapping.json --output=http://es-client:9200/.kibana --type=mapping
elasticdump --input=kibana-data.json --output=http://es-client:9200/.kibana --type=data
curl -XPUT 'http://es-client:9200/_template/dockbeat' -d@dockbeat.template.json
curl -XDELETE 'http://es-client:9200/dockbeat*'
curl -XPUT 'http://es-client:9200/_template/cisco-fw' -d@cisco-fw-mapping.json
