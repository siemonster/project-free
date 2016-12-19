FROM ubuntu
RUN apt-get install nodejs npm
COPY /root /root
CMD bash -c "cd /root/elasticloader; ./kibana-loader.sh"