# rental-system

## Getting started
Requirements:

  - [PHP v8.3](https://www.php.net/releases/8.3/en.php)
  - [node v20.0.0](https://nodejs.org/docs/latest-v20.x/api/index.html)
  - [npm v9.6.4](https://docs.npmjs.com/)
  - [MySQL v8](https://dev.mysql.com/doc/)

    
 Tools:
 
   - [laravel v11](https://laravel.com/docs/11.x)
   - [reactjs](https://react.dev/learn)
   - [inertia](https://inertiajs.com/)
   - [vite](https://vitejs.dev/guide/)
   - [tailwind css](https://tailwindcss.com/docs/installation)
   - [composer v2.7.0](https://getcomposer.org/)
   - [typescript v5](https://www.typescriptlang.org/)

Optional but highly recommended:
   - WSL
   - Docker (docker compose)



Clone the project repository
``` bash
git clone https://github.com/clydeortega14/rental-system.git
```

install composer
``` bash
composer install
```

Copy .env.example to .env
``` bash
cp .env.example .env
```

generate application key
``` bash
php artisan key:generate
```

edit database connection in .env file, then migrate the tables and run the seeders:
``` bash
php artisan migrate --seed
```

Install npm packages
``` bash
npm install
```

compiling the changes in the front end, just run:
``` bash
npm run dev
```

compiling build for production
``` bash
npm run build
```


## Using Docker

Must have docker engine running on your system (e.g Docker Desktop)
``` bash
docker compose up
```

Run migrations and seeders
``` bash
docker compose exec php php artisan migrate --seed
```

install frontend dependencies (node_modules)
``` bash
docker compose exec node npm install
```


## Postal Address


for the postal addresses regions, provinces, cities, and barangay, Please run the yajra/laravel-address package: [seeders]
package reference (https://github.com/yajra/laravel-address)
```bash
php artisan db:seed Yajra\\Address\\Seeders\\AddressSeeder
```

