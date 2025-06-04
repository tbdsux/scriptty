FROM php:8.4

# Update deps and install php extensions
RUN apt-get update && apt-get install -y \
    libpq-dev \
    git \
    libzip-dev \
    unzip \
    zlib1g-dev \
    && docker-php-ext-install pdo pdo_pgsql # Install depending on the database you will use

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- \
     --install-dir=/usr/local/bin --filename=composer

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install Nodejs
ENV NVM_DIR=/root/.nvm
ENV NODE_VERSION=22
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash && \
    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && \
    nvm install ${NODE_VERSION} && \
    nvm alias default ${NODE_VERSION} && \
    nvm use default

# Copy the app to the container
WORKDIR /app
COPY . .

# Build assets
ENV PATH=$NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH
RUN [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && \
    npm install && \
    npm run build

# Composer install deps
RUN composer install

# Optimizations and cache
RUN php artisan optimize
RUN php artisan config:cache
RUN php artisan event:cache
RUN php artisan route:cache
RUN php artisan view:cache

# Start the server
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8080"]