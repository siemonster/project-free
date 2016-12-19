FROM ubuntu:14.04

RUN apt-get update -qq && apt-get install -y software-properties-common curl

RUN apt-add-repository ppa:chris-lea/node.js

RUN apt-get update -qq && apt-get install -y nodejs

RUN npm install -g n && n stable

RUN npm install -g elasticdump

COPY /root /root

CMD bash -c "cd /root/elasticloader; ./kibana-loader.sh"
