# Fleet Management System Architecture

## 1. System Overview

This document outlines the architecture for a fleet management system based on the requirements specified in brief.md. The system will have three user roles:

-   Pelanggan (Customers): Can track shipments and book fleet vehicles
-   Admin: Can view fleet locations and manage the system
-   Armada (Fleet personnel): Can check in their locations

## 2. Technology Stack

-   Backend: Laravel 10 with PHP 8.1+
-   Frontend: React with Inertia.js
-   Database: MySQL
-   UI Framework: Tailwind CSS
-   Build Tool: Vite

## 3. Database Schema

### 3.1 Users Table (Existing)

Fields:

-   id (bigint, primary key)
-   name (string)
-   email (string, unique)
-   email_verified_at (timestamp)
-   password (string)
-   remember_token (string)
-   timestamps (created_at, updated_at)

### 3.2 Fleets Table

Fields:

-   id (bigint, primary key)
-   fleet_number (string, unique)
-   vehicle_type (string)
-   availability (enum: available, unavailable)
-   capacity (decimal)
-   timestamps (created_at, updated_at)

### 3.3 Shipments Table

Fields:

-   id (bigint, primary key)
-   shipment_number (string, unique)
-   shipment_date (date)
-   origin_location (string)
-   destination_location (string)
-   status (enum: pending, in_transit, arrived)
-   fleet_id (foreign key to fleets)
-   customer_id (foreign key to users)
-   timestamps (created_at, updated_at)

### 3.4 Check-ins Table

Fields:

-   id (bigint, primary key)
-   fleet_id (foreign key to fleets)
-   latitude (decimal)
-   longitude (decimal)
-   check_in_time (timestamp)
-   timestamps (created_at, updated_at)

## 4. User Roles and Permissions

### 4.1 Pelanggan (Customers)

-   Can track shipments by shipment number
-   Can book fleet vehicles for shipments
-   Can view their own shipment history

### 4.2 Admin

-   Can view all fleet locations on map
-   Can manage fleet information (add, edit, delete)
-   Can view reports on shipments
-   Can manage all shipments

### 4.3 Armada (Fleet Personnel)

-   Can check in their current location
-   Can update their availability status
-   Can view assigned shipments

## 5. Core Features Implementation

### 5.1 Shipment Tracking

-   Search by shipment number
-   Display shipment details and status
-   Show origin and destination locations

### 5.2 Fleet Management

-   CRUD operations for fleet information
-   Display fleet availability status
-   Filter by vehicle type and availability

### 5.3 Fleet Booking

-   Form for booking fleet vehicles
-   Validation for booking dates
-   Update fleet availability after booking

### 5.4 Location Check-in

-   Map interface for fleet personnel to check in
-   Store GPS coordinates
-   Display fleet locations for admin

### 5.5 Search and Filter

-   Search shipments by number or destination
-   Filter fleets by type or availability

### 5.6 Reporting

-   MySQL queries with JOIN and GROUP BY
-   Statistics on shipments per fleet

## 6. UI Components

### 6.1 Layout Components

-   Main layout with header and sidebar
-   Responsive design for mobile devices
-   Role-based navigation

### 6.2 Reusable Components

-   Data tables with sorting and pagination
-   Form components with validation
-   Map component for location display

## 7. API Endpoints

### 7.1 Authentication

-   Login/Logout
-   Role-based access control

### 7.2 Fleet Management

-   GET /fleets - List all fleets
-   POST /fleets - Create new fleet
-   GET /fleets/{id} - Get fleet details
-   PUT /fleets/{id} - Update fleet
-   DELETE /fleets/{id} - Delete fleet

### 7.3 Shipment Tracking

-   GET /shipments - List shipments
-   GET /shipments/{id} - Get shipment details
-   POST /shipments - Create new shipment
-   GET /shipments/track/{number} - Track shipment by number

### 7.4 Check-in System

-   POST /check-ins - Create new check-in
-   GET /check-ins/latest - Get latest check-ins
-   GET /check-ins/fleet/{id} - Get check-ins for specific fleet

## 8. Validation Rules

-   Booking date cannot be in the past
-   Shipment details must be complete
-   Fleet cannot be double-booked
-   Required fields validation

## 9. Testing Strategy

-   Unit tests for models and controllers
-   Feature tests for user flows
-   Database factory and seeder tests
-   API endpoint tests
