#!/usr/bin/env bash

export PATH=/usr/local/bin/:/opt/local/bin/:$PATH

write_hosts () {
    id=$1

    ip=`docker inspect -f '{{ .NetworkSettings.IPAddress }}' $id`
    hostname=`docker inspect -f '{{ .Name }}' $id | grep -oE '[a-z0-9A-Z_.-]+'`

    hosts=`cat /etc/hosts`

    if [ "$ip"       ]; then hosts=`echo "$hosts" | grep -v '"$ip "'    `; fi
    if [ "$hostname" ]; then hosts=`echo "$hosts" | grep -v $hostname.lo`; fi

    echo "$hosts" > /tmp/hosts

    if [ "$ip" ] && [ "$hostname" ]; then
        echo $ip $hostname.lo >> /tmp/hosts
    fi

    cp /tmp/hosts /etc/hosts

    killall -HUP dnsmasq
}

for id in `docker ps -q --no-trunc`; do
    write_hosts $id
done

docker events --filter event=start | while read line; do write_hosts `echo $line | grep -oE '[0-9a-f]{64}'`; done;
