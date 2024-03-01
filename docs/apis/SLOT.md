# Slot API Documentation

## Introduction

This part of the document provides comprehensive details on the APIs related to slot management. It covers how to retrieve information about slots, including their current state and availability.

## Sample Base URL

You may use the following base URLs for API requests:

- Local Setup: `http://localhost:3002/api`
- Deployment: `https://example.com/api`

## "Slots" API Endpoints

### 1. Get All Slots

- **Endpoint:** `/slots`
- **Method:** `GET`
- **Description:** Retrieves a list of all slots within a specified machine, including their current state and location.
- **Query Parameters:**
    - `machine_id`: string - The unique identifier of the machine whose slots are being queried.
- **Sample Request:**
    ```http
    GET https://example.com/api/slots?machine_id=5640df79-df4f-4f23-9bc1-ec92c0974faa
    ```
- **Sample Response (200 OK):**
    ```json
    [
        {
            "id": "df442c95-fa26-42b1-bd4d-428b3b0d73cb",
            "slot_code": "A01",
            "slot_state": {
                "id": "744066fd-4ae4-4967-9011-2c51afb139a0",
                "name": "empty",
                "description": null
            },
            "location_id": "5640df79-df4f-4f23-9bc1-ec92c0974faa"
        },
        {
            "id": "cb4bda69-6ce2-4493-b011-7a20e6285908",
            "slot_code": "A02",
            "slot_state": {
                "id": "744066fd-4ae4-4967-9011-2c51afb139a0",
                "name": "empty",
                "description": null
            },
            "location_id": "5640df79-df4f-4f23-9bc1-ec92c0974faa"
        }
    ]
    ```

    <details>
    <summary><i><strong>Param `machine_id` Missing (400 Bad Request)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Parameter 'machine_id' is required."
    > }
    > ```
        
    </details>

    <details>
    <summary><i><strong>Invalid Param `machine_id` (400 Bad Request)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Paramer 'machine_id' is an invalid ID format."
    > }
    > ```
        
    </details>

    <details>
    <summary><i><strong>Not Found Param `machine_id` (404 Not Found)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Not found: machine_id"
    > }
    > ```
        
    </details>

### 2. Get Slot

- **Endpoint:** `/slots/<slot_id>`
- **Method:** `GET`
- **Description:** Fetches information about a specific slot.
- **Query Parameters:**
    - `machine_id`: string - The unique identifier of the machine to which the slot belongs.
- **Sample Request:**
    ```http
    GET https://example.com/api/slots/df442c95-fa26-42b1-bd4d-428b3b0d73cb?machine_id=5640df79-df4f-4f23-9bc1-ec92c0974faa
    ```
- **Sample Response (200 OK):**
    ```json
    {
        "id": "df442c95-fa26-42b1-bd4d-428b3b0d73cb",
        "slot_code": "A01",
        "slot_state": {
            "id": "744066fd-4ae4-4967-9011-2c51afb139a0",
            "name": "empty",
            "description": null
        },
        "location_id": "5640df79-df4f-4f23-9bc1-ec92c0974faa"
    }
    ```

    <details>
    <summary><i><strong>Param `machine_id` Missing (400 Bad Request)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Parameter 'machine_id' is required."
    > }
    > ```
        
    </details>

    <details>
    <summary><i><strong>Invalid Param `machine_id` (400 Bad Request)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Paramer 'machine_id' is an invalid ID format."
    > }
    > ```
        
    </details>

    <details>
    <summary><i><strong>Not Found Param `machine_id` (404 Not Found)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Not found: machine_id"
    > }
    > ```
        
    </details>

    <details>
    <summary><i><strong>Invalid ID (400 Bad Request)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Invalid ID format."
    > }
    > ```
        
    </details>

    <details>
    <summary><i><strong>Not Found Slot ID (404 Not Found)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "SlotWithState not found."
    > }
    > ```
    
    </details>

### 3. Get All Available Slots

- **Endpoint:** `/slots/available_lists`
- **Method:** `GET`
- **Description:** Lists all slots that are currently empty and available for adding new plants within a specified machine.
- **Query Parameters:**
    - `machine_id`: string - The ID of the machine to list its available slots.
- **Sample Request:**
    ```http
    GET https://example.com/api/slots/available_lists?machine_id=5640df79-df4f-4f23-9bc1-ec92c0974faa
    ```
- **Sample Response (200 OK):**
    ```json
    [
        {
            "id": "df442c95-fa26-42b1-bd4d-428b3b0d73cb",
            "slot_code": "A01",
            "slot_state": {
                "id": "744066fd-4ae4-4967-9011-2c51afb139a0",
                "name": "empty",
                "description": null
            },
            "location_id": "5640df79-df4f-4f23-9bc1-ec92c0974faa"
        },
        {
            "id": "cb4bda69-6ce2-4493-b011-7a20e6285908",
            "slot_code": "A02",
            "slot_state": {
                "id": "744066fd-4ae4-4967-9011-2c51afb139a0",
                "name": "empty",
                "description": null
            },
            "location_id": "5640df79-df4f-4f23-9bc1-ec92c0974faa"
        }
    ]
    ```

    <details>
    <summary><i><strong>Param `machine_id` Missing (400 Bad Request)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Parameter 'machine_id' is required."
    > }
    > ```
        
    </details>

    <details>
    <summary><i><strong>Invalid Param `machine_id` (400 Bad Request)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Paramer 'machine_id' is an invalid ID format."
    > }
    > ```
        
    </details>

    <details>
    <summary><i><strong>Not Found Param `machine_id` (404 Not Found)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Not found: machine_id"
    > }
    > ```
        
    </details>
