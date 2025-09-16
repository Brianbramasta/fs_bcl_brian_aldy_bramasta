# Testing Documentation

## Overview

This document provides instructions on how to run tests for the Fleet Management System.

## Prerequisites

-   PHP 8.1 or higher
-   Composer
-   MySQL or SQLite database
-   Laravel application setup

## Test Structure

The application includes feature tests for the main controllers:

-   `FleetControllerTest` - Tests for fleet management functionality
-   `ShipmentControllerTest` - Tests for shipment tracking and booking functionality
-   `CheckInControllerTest` - Tests for location check-in functionality

## Running Tests

### Run All Tests

```bash
php artisan test
```

### Run Specific Test Class

```bash
php artisan test --filter=FleetControllerTest
php artisan test --filter=ShipmentControllerTest
php artisan test --filter=CheckInControllerTest
```

### Run Tests with Coverage

```bash
php artisan test --coverage
```

## Test Descriptions

### FleetControllerTest

-   `admin_can_view_fleets` - Verifies that admin users can view the fleet list
-   `regular_user_can_view_fleets` - Verifies that regular users can view the fleet list
-   `admin_can_create_fleet` - Verifies that admin users can create new fleets
-   `admin_can_update_fleet` - Verifies that admin users can update existing fleets
-   `admin_can_delete_fleet` - Verifies that admin users can delete fleets

### ShipmentControllerTest

-   `customer_can_view_shipments` - Verifies that customers can view their shipments
-   `customer_can_create_shipment` - Verifies that customers can book new shipments
-   `customer_can_track_shipment` - Verifies that customers can track shipments by number
-   `admin_can_update_shipment` - Verifies that admin users can update shipments
-   `admin_can_delete_shipment` - Verifies that admin users can delete shipments

### CheckInControllerTest

-   `fleet_user_can_create_check_in` - Verifies that fleet personnel can check in their locations
-   `admin_can_view_check_ins` - Verifies that admin users can view check-in history
-   `fleet_user_can_view_check_in_form` - Verifies that fleet personnel can access the check-in form

## Factories

The tests use the following model factories:

-   `FleetFactory` - Creates fleet records with random data
-   `ShipmentFactory` - Creates shipment records with random data
-   `CheckInFactory` - Creates check-in records with random data
-   `UserFactory` - Creates user records (provided by Laravel Breeze)

## Continuous Integration

For CI/CD pipelines, you can run tests with:

```bash
php artisan test --parallel
```

## Troubleshooting

If tests are failing due to database issues:

1. Ensure your database connection is properly configured in `.env.testing`
2. Run migrations for the test database:
    ```bash
    php artisan migrate --env=testing
    ```
3. If using SQLite, ensure the database file is writable
