# API Documentation

## Overview

This document describes the API endpoints available in the Fleet Management System.

## Authentication

All endpoints require authentication via Laravel session authentication.

## Fleet Management

### Get All Fleets

```
GET /fleets
```

Returns a list of all fleets with optional search and filter parameters.

**Query Parameters:**

-   `search` (string): Search by fleet number or vehicle type
-   `availability` (string): Filter by availability (available, unavailable)
-   `vehicle_type` (string): Filter by vehicle type

### Create Fleet

```
POST /fleets
```

Creates a new fleet.

**Request Body:**

-   `fleet_number` (string, required): Unique fleet number
-   `vehicle_type` (string, required): Type of vehicle
-   `capacity` (decimal, required): Capacity in kg

### Get Fleet

```
GET /fleets/{id}
```

Returns details of a specific fleet.

### Update Fleet

```
PUT /fleets/{id}
```

Updates a specific fleet.

**Request Body:**

-   `fleet_number` (string, required): Unique fleet number
-   `vehicle_type` (string, required): Type of vehicle
-   `capacity` (decimal, required): Capacity in kg

### Delete Fleet

```
DELETE /fleets/{id}
```

Deletes a specific fleet.

## Shipment Management

### Get All Shipments

```
GET /shipments
```

Returns a list of all shipments with optional search and filter parameters.

**Query Parameters:**

-   `search` (string): Search by shipment number or destination
-   `status` (string): Filter by status (pending, in_transit, arrived)
-   `fleet_id` (integer): Filter by fleet ID

### Create Shipment

```
POST /shipments
```

Creates a new shipment.

**Request Body:**

-   `shipment_number` (string, required): Unique shipment number
-   `shipment_date` (date, required): Shipment date (must be in the future)
-   `origin_location` (string, required): Origin location
-   `destination_location` (string, required): Destination location
-   `fleet_id` (integer, required): Fleet ID

### Get Shipment

```
GET /shipments/{id}
```

Returns details of a specific shipment.

### Update Shipment

```
PUT /shipments/{id}
```

Updates a specific shipment.

**Request Body:**

-   `shipment_number` (string, required): Unique shipment number
-   `shipment_date` (date, required): Shipment date
-   `origin_location` (string, required): Origin location
-   `destination_location` (string, required): Destination location
-   `fleet_id` (integer, required): Fleet ID

### Delete Shipment

```
DELETE /shipments/{id}
```

Deletes a specific shipment.

### Track Shipment

```
GET /shipments/track
```

Tracks a shipment by number.

**Query Parameters:**

-   `shipment_number` (string, required): Shipment number to track

## Check-In Management

### Get All Check-Ins

```
GET /check-ins
```

Returns a list of all check-ins.

### Create Check-In

```
POST /check-ins
```

Creates a new check-in.

**Request Body:**

-   `fleet_id` (integer, required): Fleet ID
-   `latitude` (decimal, required): Latitude coordinate
-   `longitude` (decimal, required): Longitude coordinate

### Get Check-In

```
GET /check-ins/{id}
```

Returns details of a specific check-in.

### Get Latest Check-Ins

```
GET /check-ins/latest
```

Returns the latest check-ins for map display.

## Reports

### Get Reports

```
GET /reports
```

Returns shipment statistics and fleet availability reports.
