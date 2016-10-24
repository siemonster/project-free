FROM ubuntu

# install stable node.js from repo
RUN apt-get update; apt-get install -y --force-yes nodejs nodejs-legacy npm git ssh-client libkrb5-dev dos2unix
RUN npm install -g bower gulp

RUN mkdir -p /root/acembly

COPY ./package.json /root/acembly/package.json
RUN cd /root/acembly; npm update

COPY ./bower.json /root/acembly/bower.json
RUN cd /root/acembly; bower update --allow-root

COPY . /root/acembly
RUN cd /root/acembly; gulp

CMD cd /root/acembly; node server.js