FROM php:8.4-fpm


# Set working directory
WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    unzip \
    zip \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    libicu-dev \
    libpq-dev \
    libsqlite3-dev \
    libssl-dev \
    default-mysql-client \
    && rm -rf /var/lib/apt/lists/*

# Configure GD
RUN docker-php-ext-configure gd \
    --with-freetype \
    --with-jpeg

# Install PHP extensions
RUN docker-php-ext-install -j$(nproc) \
    pdo \
    pdo_mysql \
    mysqli \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    zip \
    intl \
    opcache

# Install Redis extension
RUN pecl install redis \
    && docker-php-ext-enable redis


# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer


# Create application user
RUN groupadd -g 1000 www \
    && useradd -u 1000 -ms /bin/bash -g www www


# Copy custom PHP configuration (optional)
COPY .docker/php/php.ini /usr/local/etc/php/conf.d/custom.ini

# Copy project files
COPY . .

# Set permissions
RUN chown -R www:www /var/www/html \
    && chmod -R 775 storage bootstrap/cache

USER www

EXPOSE 9000

CMD ["php-fpm"]