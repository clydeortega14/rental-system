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

edit database connection in .env file, then run:
``` bash
php artisan migrate
```

Install npm packages
``` bash
npm install --no-save
```

compiling the changes in the front end, just run:
``` bash
npm run dev
```
Detect linting errors with ESLint
```bash
npm run lint
```

Fix errors detects from ESLint
```bash
npm run lint:fix
```
Safety type checking
```bash
npm run type-check
```

compiling build for production
``` bash
npm run build
```

