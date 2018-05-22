FROM php:7.0.8-fpm

RUN docker-php-ext-install bcmath mbstring pdo_mysql
RUN docker-php-ext-install opcache
RUN apt-get update
RUN apt-get install -y nano
RUN apt-get install -y vim
RUN apt-get install -y git
RUN apt-get install -y telnet

RUN git clone --depth=1 "git://github.com/phalcon/cphalcon.git"
RUN cd cphalcon/build && ./install
COPY config/phalcon.ini /usr/local/etc/php/conf.d/phalcon.ini

RUN curl -sL https://deb.nodesource.com/setup_9.x | bash - && \
apt-get install -yq nodejs build-essential

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install yarn

RUN apt-get install -y python-pip
RUN pip install awscli
ADD aws /root/.aws

ADD init.sh /usr/bin/init.sh
RUN chmod +x /usr/bin/init.sh

RUN mkdir -p /etc/php-fpm.d/
ADD config/php-fpm.conf                /usr/local/etc/php-fpm.conf
ADD config/www.conf                    /etc/php-fpm.d/www.conf
ADD config/zz-docker.conf              /etc/php-fpm.d/zz-docker.conf

WORKDIR /var/www

VOLUME ["/var/run", "/var/www"]

CMD ["init.sh"]
