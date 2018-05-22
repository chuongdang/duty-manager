#!/bin/bash

VOLUME=${VOLUME:-/var/www}
ALLOW=${ALLOW:-192.168.0.0/16 172.16.0.0/12 127.0.0.1}
OWNER=${OWNER:-www-data}
GROUP=${GROUP:-nogroup}

chown "${OWNER}:${GROUP}" "${VOLUME}"

[ -f /etc/rsyncd.conf ] || cat <<EOF > /etc/rsyncd.conf
uid = ${OWNER}
gid = ${GROUP}
use chroot = yes
log file = /dev/stdout
reverse lookup = no
[volume]
    hosts deny = *
    hosts allow = ${ALLOW}
    read only = false
    path = ${VOLUME}
    comment = docker volume
EOF

chmod -R 777 /var/www

exec /usr/bin/rsync --no-detach --daemon --config /etc/rsyncd.conf "$@"
