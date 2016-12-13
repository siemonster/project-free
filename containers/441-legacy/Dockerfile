FROM ubuntu

RUN apt-get update
RUN apt-get install apache2 libapache2-mod-php php-xml php7.0-mbstring php7.0-sqlite php7.0-curl nodejs-legacy npm sqlite3 curl git
RUN curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer

RUN a2enmod rewrite; a2enmod headers

RUN npm install -g grunt-cli bower

RUN mkdir -p /var/www
RUN cd /var/www; git clone https://github.com/etsy/411
RUN cd /var/www; npm install; bower install --allow-root; composer install
RUN cd /var/www; grunt prod