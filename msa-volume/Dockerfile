FROM extremeprog/mongo-sites-api

RUN wget https://github.com/siemonster/AWS/raw/master/mongobck.tar.gz
RUN tar -zxvf mongobck.tar.gz

RUN mv /var/lib/mongo-sites-api/* /var/lib/

VOLUME /var/lib/mongodb
CMD /bin/true