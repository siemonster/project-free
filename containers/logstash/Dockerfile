FROM ikuturso/logstash:ssl
COPY /config-dir /config-dir
RUN bash -c "openssl req -x509 -batch -nodes -days 3650 -newkey rsa:2048 -keyout /etc/pki/tls/private/logstash-forwarder.key -out /etc/pki/tls/certs/logstash-forwarder.crt -subj /CN=$SERVER_CN"
