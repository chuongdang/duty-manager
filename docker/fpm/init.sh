#!/bin/bash

echo 'export TERM=xterm' >> ~/.bashrc
echo 'export EDITOR=nano' >> ~/.bashrc
echo 'alias ll="ls -lha"' >> ~/.bashrc

php-fpm
