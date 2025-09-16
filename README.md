<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About The Fleet Management System

This is a Fleet Management System built with Laravel and React. The system allows for tracking shipments, managing fleet vehicles, and monitoring fleet locations.

## Features

-   User role management (Customers, Admins, Fleet Personnel)
-   Fleet vehicle management (CRUD operations)
-   Shipment tracking and booking
-   Location check-in functionality
-   Search and filtering capabilities
-   Reporting with MySQL queries
-   Responsive UI design

## Requirements

-   PHP 8.1 or higher
-   Composer
-   MySQL or compatible database
-   Node.js and NPM

## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2. Install PHP dependencies:

    ```bash
    composer install
    ```

3. Install Node dependencies:

    ```bash
    npm install
    ```

4. Copy and configure the environment file:

    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

5. Configure database settings in `.env`

6. Run database migrations:

    ```bash
    php artisan migrate
    ```

7. Run database seeders:

    ```bash
    php artisan db:seed
    ```

8. Build frontend assets:

    ```bash
    npm run dev
    ```

9. Start the development server:
    ```bash
    php artisan serve
    ```

## Testing

Run tests with:

```bash
php artisan test
```

See [testing_documentation.md](testing_documentation.md) for detailed testing instructions.

## User Credentials

After seeding the database, you can log in with the following credentials:

### Customer

-   Email: customer@example.com
-   Password: password

### Admin

-   Email: admin@example.com
-   Password: password

### Fleet Personnel

-   Email: fleet@example.com
-   Password: password

## Documentation

-   [System Architecture](refference/system_architecture.md)
-   [Implementation Summary](IMPLEMENTATION_SUMMARY.md)
-   [Testing Documentation](testing_documentation.md)
-   [Requirements (Brief)](refference/brief.md)

## Contributing

Thank you for considering contributing to the Fleet Management System!

## License

The Fleet Management System is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
