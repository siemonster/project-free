FROM extremeprog/mongo-sites-api:feature-admin-dbclone

COPY . /root/mongo-sites-api

RUN bash -c 'cd plugins; npm update || echo'

ARG ADDITIONAL_COMMAND
RUN bash -c "$ADDITIONAL_COMMAND"
