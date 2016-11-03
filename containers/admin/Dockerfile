FROM extremeprog/mongo-sites-api:tdd

COPY . /root/mongo-sites-api

RUN bash -c 'cd plugins; npm update || echo'
