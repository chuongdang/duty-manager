#!/bin/bash

echo 'export TERM=xterm' >> ~/.bashrc
echo 'export EDITOR=nano' >> ~/.bashrc
echo 'alias ll="ls -lha"' >> ~/.bashrc

if [ ! -d "/var/www/astro" ]; then
    cd /var/www
    git clone https://github.com/chuongdang/duty-manager.git astro

    cd /var/www/astro

    aws s3 cp s3://nksg/source/astro-vendor.tar.gz astro-vendor.tar.gz --profile default --region=ap-southeast-1

    tar xzvf astro-vendor.tar.gz

    rm astro-vendor.tar.gz
fi

cd /var/www/astro/public/dev

yarn install
yarn build

php-fpm
