FROM ubuntu
RUN apt-get update && apt-get install -y nodejs npm curl && npm install elasticdump
COPY /root /root
CMD bash -c "cd /root/elasticloader; ./kibana-loader.sh"
