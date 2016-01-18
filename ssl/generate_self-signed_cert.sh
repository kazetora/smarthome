#!/bin/bash

if which openssl > /dev/null; then
    echo "openssl is installed"
else
    echo "openssl is not installed"
    exit 1
fi

OPENSSL=`which openssl`

`$OPENSSL genrsa -des3 -passout pass:x -out server.pass.key 2048`

`$OPENSSL rsa -passin pass:x -in server.pass.key -out server.key`

rm server.pass.key

`$OPENSSL req -new -key server.key -out server.csr`


`$OPENSSL x509 -req -days 365 -in server.csr -signkey server.key -out server.crt`
