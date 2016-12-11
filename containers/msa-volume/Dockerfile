FROM extremeprog/mongo-sites-api:feature-admin-dbclone

RUN apt-get update; apt-get install -y --force-yes wget

RUN wget https://github.com/siemonster/AWS/raw/master/mongobck.tar.gz
RUN tar -zxvf mongobck.tar.gz

RUN mv var/lib/mongo-sites-api/mongodb/* /var/lib/mongodb/

#RUN ${ADDITIONAL_COMMAND}

CMD /bin/true
