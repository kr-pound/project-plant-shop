# Machine API Documentation

## Introduction

This part of the documentation details the API endpoints related to machine operations. These endpoints cover the creation, retrieval, updating, and deletion of machine records along with their locations.

## Sample Base URL

You may use the following base URLs for API requests:

- Local Setup: `http://localhost:3002/api`
- Deployment: `https://example.com/api`

## "Machines" API Endpoints

### 1. Create Machine with Location

- **Endpoint:** `/machines`
- **Method:** `POST`
- **Description:** Creates a new machine record with associated location name.
- **Query Parameters:**
    - `staff_id`: string - ID of the staff performing the operation.
- **Body Parameters:**
    - `name`: string - The machine's location name.
    - `description`: string - Provides details about the machine's location.
    - `capacity`: integer - How many plants the machine can hold at maximum, counted in slots.
- **Sample Request:**
    ```http
    POST https://example.com/api/machines?staff_id=00000000-0000-4000-8000-000000000000
    ```
- **Sample Body:**
    ```json
    {
        "name": "Siam Plant Hub",
        "description": "Located at Siam Square, take the BTS Skytrain to Siam station and exit via gate 4.",
        "capacity": 45
    }
    ```
- **Sample Response (200 OK):**
    ```json
    {
        "id": "d39a7941-ad14-4b12-8528-16931bffeb3f",
        "name": "Siam Plant Hub",
        "description": "Located at Siam Square, take the BTS Skytrain to Siam station and exit via gate 4.",
        "capacity": 45,
        "plant_amount": 0,
        "staff_id": "00000000-0000-4000-8000-000000000000"
    }
    ```
    
    <details>
    <summary><i><strong>Param `staff_id` Missing (400 Bad Request)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Parameter 'staff_id' is required."
    > }
    > ```
        
    </details>

    <details>
    <summary><i><strong>Invalid Param `staff_id` (400 Bad Request)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Paramer 'staff_id' is an invalid ID format."
    > }
    > ```
        
    </details>

    <details>
    <summary><i><strong>Not Found Param `staff_id` (404 Not Found)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Not found: staff_id"
    > }
    > ```
        
    </details>

    <details>
    <summary><i><strong>Body Missing (400 Bad Request)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Request body is missing or empty."
    > }
    > ```
        
    </details>

### 2. Get All Machines with Locations

- **Endpoint:** `/machines`
- **Method:** `GET`
- **Description:** Gets a list of all machines and where they are, narrow down the list by staff ID and a search keyword.
- **Query Parameters:**
    - `staff_id`: string - ID of the staff performing the operation.
    - `search`: string (optional) - Looks for machines that match a given word in their name.
- **Sample Request:**
    ```http
    GET https://example.com/api/machines?staff_id=00000000-0000-4000-8000-000000000000&search=plant
    ```
- **Sample Response (200 OK):**
    ```json
    [
        {
            "id": "70ad9613-597c-4193-95ca-30461c595a3e",
            "name": "Asok Plant Spot",
            "description": "Situated in Asok area, reach it by taking the BTS Skytrain to Asok station or MRT Sukhumvit station.",
            "capacity": 30,
            "plant_amount": 0,
            "staff_id": "00000000-0000-4000-8000-000000000000"
        },
        {
            "id": "d39a7941-ad14-4b12-8528-16931bffeb3f",
            "name": "Siam Plant Hub",
            "description": "Located at Siam Square, take the BTS Skytrain to Siam station and exit via gate 4.",
            "capacity": 45,
            "plant_amount": 0,
            "staff_id": "00000000-0000-4000-8000-000000000000"
        }
    ]
    ```

    <details>
    <summary><i><strong>Param `staff_id` Missing (400 Bad Request)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Parameter 'staff_id' is required."
    > }
    > ```
        
    </details>

    <details>
    <summary><i><strong>Invalid Param `staff_id` (400 Bad Request)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Paramer 'staff_id' is an invalid ID format."
    > }
    > ```
        
    </details>

    <details>
    <summary><i><strong>Not Found Param `staff_id` (404 Not Found)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Not found: staff_id"
    > }
    > ```
        
    </details>

### 3. Get Machine with Location

- **Endpoint:** `/machines/<machine_id>`
- **Method:** `GET`
- **Description:** Provides details about a particular machine, including where it's located, by using the machine's unique ID.
- **Query Parameters:**
    - `staff_id`: string - ID of the staff performing the operation.
- **Sample Request:**
    ```http
    GET https://example.com/api/machines/d39a7941-ad14-4b12-8528-16931bffeb3f?staff_id=00000000-0000-4000-8000-000000000000
    ```
- **Sample Response (200 OK):**
    ```json
    {
        "id": "d39a7941-ad14-4b12-8528-16931bffeb3f",
        "name": "Siam Plant Hub",
        "description": "Located at Siam Square, take the BTS Skytrain to Siam station and exit via gate 4.",
        "capacity": 45,
        "plant_amount": 0,
        "staff_id": "00000000-0000-4000-8000-000000000000"
    }
    ```

    <details>
    <summary><i><strong>Param `staff_id` Missing (400 Bad Request)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Parameter 'staff_id' is required."
    > }
    > ```
        
    </details>

    <details>
    <summary><i><strong>Invalid Param `staff_id` (400 Bad Request)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Paramer 'staff_id' is an invalid ID format."
    > }
    > ```
        
    </details>

    <details>
    <summary><i><strong>Not Found Param `staff_id` (404 Not Found)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Not found: staff_id"
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
    <summary><i><strong>Not Found Machine ID (404 Not Found)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "MachineWithLocation not found."
    > }
    > ```
        
    </details>

### 4. Update Machine with Location

- **Endpoint:** `/machines/<machine_id>`
- **Method:** `PUT`
- **Description:** Changes the information of an existing machine.
- **Query Parameters:**
    - `staff_id`: string - ID of the staff performing the operation.
- **Body Parameters:**
    - `name`: string - New machine's location name.
    - `description`: string - Updated details about the machine's location.
    - `capacity`: integer (optional) - New maximum number of plant slots in the machine.
- **Sample Request:**
    ```http
    PUT https://example.com/api/machines/d39a7941-ad14-4b12-8528-16931bffeb3f?staff_id=00000000-0000-4000-8000-000000000000
    ```
- **Sample Body:**
    ```json
    {
        "name": "Siam Plant Hub",
        "description": "Located at Siam Square, take the BTS Skytrain to Siam station and exit via gate 4.",
        "capacity": 45
    }
    ```
- **Sample Response (200 OK):**
    ```json
    {
        "id": "d39a7941-ad14-4b12-8528-16931bffeb3f",
        "name": "Siam Plant Hub",
        "description": "Located at Siam Square, take the BTS Skytrain to Siam station and exit via gate 4.",
        "capacity": 45,
        "plant_amount": 0,
        "staff_id": "00000000-0000-4000-8000-000000000000"
    }
    ```

    <details>
    <summary><i><strong>Param `staff_id` Missing (400 Bad Request)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Parameter 'staff_id' is required."
    > }
    > ```
        
    </details>

    <details>
    <summary><i><strong>Invalid Param `staff_id` (400 Bad Request)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Paramer 'staff_id' is an invalid ID format."
    > }
    > ```
        
    </details>

    <details>
    <summary><i><strong>Not Found Param `staff_id` (404 Not Found)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Not found: staff_id"
    > }
    > ```
        
    </details>

    <details>
    <summary><i><strong>Body Missing (400 Bad Request)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Request body is missing or empty."
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
    <summary><i><strong>Not Found Machine ID (404 Not Found)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "MachineWithLocation not found."
    > }
    > ```
        
    </details>

### 5. Delete Machine with Location

- **Endpoint:** `/machines/<machine_id>`
- **Method:** `DELETE`
- **Description:** Removes a machine and the details about its location from the system using the machine's ID.
- **Query Parameters:**
    - `staff_id`: string - ID of the staff performing the operation.
- **Sample Request:**
    ```http
    DELETE https://example.com/api/machines/d39a7941-ad14-4b12-8528-16931bffeb3f?staff_id=00000000-0000-4000-8000-000000000000
    ```
- **Sample Response (200 OK):**
    ```json
    {
        "id": "d39a7941-ad14-4b12-8528-16931bffeb3f",
        "name": "Siam Plant Hub",
        "description": "Located at Siam Square, take the BTS Skytrain to Siam station and exit via gate 4.",
        "capacity": 45,
        "plant_amount": 0,
        "staff_id": "00000000-0000-4000-8000-000000000000"
    }
    ```

    <details>
    <summary><i><strong>Param `staff_id` Missing (400 Bad Request)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Parameter 'staff_id' is required."
    > }
    > ```
        
    </details>

    <details>
    <summary><i><strong>Invalid Param `staff_id` (400 Bad Request)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Paramer 'staff_id' is an invalid ID format."
    > }
    > ```
        
    </details>

    <details>
    <summary><i><strong>Not Found Param `staff_id` (404 Not Found)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Not found: staff_id"
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
    <summary><i><strong>Not Found Machine ID (404 Not Found)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "MachineWithLocation not found."
    > }
    > ```
        
    </details>

### 6. Delete All Machines with Locations

- **Endpoint:** `/machines`
- **Method:** `DELETE`
- **Description:** Erases all machines and their location information from the system. It will clear all records.
- **Query Parameters:**
    - `staff_id`: string - ID of the staff performing the operation.
- **Sample Request:**
    ```http
    DELETE https://example.com/api/machines?staff_id=00000000-0000-4000-8000-000000000000
    ```
- **Sample Response (200 OK):**
    ```json
    [
        {
            "id": "5418abdc-4f64-4556-9a82-1bb7d7358f79",
            "name": "Green Terminal",
            "description": "At Chatuchak Park, accessible via MRT Chatuchak Park station or BTS Mo Chit station.",
            "capacity": 60,
            "plant_amount": 0,
            "staff_id": "00000000-0000-4000-8000-000000000000"
        },
        {
            "id": "70ad9613-597c-4193-95ca-30461c595a3e",
            "name": "Asok Plant Spot",
            "description": "Situated in Asok area, reach it by taking the BTS Skytrain to Asok station or MRT Sukhumvit station.",
            "capacity": 30,
            "plant_amount": 0,
            "staff_id": "00000000-0000-4000-8000-000000000000"
        }
    ]
    ```

    <details>
    <summary><i><strong>Param `staff_id` Missing (400 Bad Request)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Parameter 'staff_id' is required."
    > }
    > ```
        
    </details>

    <details>
    <summary><i><strong>Invalid Param `staff_id` (400 Bad Request)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Paramer 'staff_id' is an invalid ID format."
    > }
    > ```
        
    </details>

    <details>
    <summary><i><strong>Not Found Param `staff_id` (404 Not Found)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Not found: staff_id"
    > }
    > ```
        
    </details>
