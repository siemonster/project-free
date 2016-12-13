FROM ubuntu
RUN echo 'deb http://nginx.org/packages/mainline/ubuntu/ trusty nginx' > /etc/apt/sources.list.d/nginx.list; apt-get update;
RUN apt-get install -y --force-yes psmisc inotify-tools dnsmasq git wget cron nginx=1.9.15-1~trusty

ADD https://raw.githubusercontent.com/tests-always-included/mo/master/mo /root/mo

RUN cd /root/ && git clone https://github.com/certbot/certbot && cd /root/certbot && ( ./certbot-auto -n || echo )

ARG DOCKER_VERSION=1.9.1
RUN cd /root/ && wget https://get.docker.com/builds/Linux/x86_64/docker-"$DOCKER_VERSION".tgz && tar zxvf docker-"$DOCKER_VERSION".tgz && ln -s /root/docker/docker /usr/bin/docker

COPY / /

CMD /run_app nginx

