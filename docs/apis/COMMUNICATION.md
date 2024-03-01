# Communication API

## Introduction

This part of document details the communication APIs within our system, emphasizing the integration with the Hardware Controller. These APIs allow for real-time interaction with physical devices.

## Documentation

For a detailed understanding of the project, including its architecture, technologies used, and how it integrates with the frontend, we recommend exploring the following resources:

- **Project Overview**: For a comprehensive overview of the Automatic Plant Shop project, including its objectives, benefits, and how it works, please visit our [Project Overview](https://www.canva.com/design/DAFhHgrEElo/1SBT6pT8EZJhtn4npe5n3A/edit).

- **Project Report**: For an in-depth analysis and report on the project, please refer to [Automatic_Plant_Shop_Report.pdf](./docs//Automatic_Plant_Shop_Report.pdf).

## Sample Base URL

You may use the following base URLs for API requests:

- Local Setup: `http://localhost:3002/api`
- Deployment: `https://example.com/api`

## "Communication" API Endpoints

### 1. Change Plant State

- **Endpoint:** `/request_change_plant_state/<plant_id>`
- **Method:** `PATCH`
- **Description:** Changes the current state of a specified plant. This request is now limited to `reserved` and `sold` state only.
- **Body Parameters:**
    - `plant_state_id`: string - The unique identifier for the new state to apply to the plant.
- **Sample Request:**
    ```http
    PATCH https://example.com/api/request_change_plant_state/5927cbc7-b170-4ce2-b68f-3dfaca0b1717
    ```
- **Sample Body:**
    ```json
    {
        "plant_state_id": "793d3761-9f6d-4162-84c4-327511ed8975"
    }
    ```
- **Sample Response (200 OK):**
    ```json
    {
        "id": "5927cbc7-b170-4ce2-b68f-3dfaca0b1717",
        "plant_state": {
            "id": "793d3761-9f6d-4162-84c4-327511ed8975",
            "name": "sold",
            "description": "has been sold"
        }
    }
    ```

### 2. Request Door Open

- **Endpoint:** `/signal/request_open/<plant_id>`
- **Method:** `PATCH`
- **Description:** Sends a signal to open the door for a specified plant, allowing for physical access.
- **Sample Request:**
    ```http
    PATCH https://example.com/api/signal/request_open/cd76bcff-7604-442a-87ac-5a537472701a
    ```

### 3. Request Door Lock

- **Endpoint:** `/signal/request_open/<plant_id>`
- **Method:** `PATCH`
- **Description:** Sends a signal to securely lock the door for a specified plant, preventing unauthorized access.
- **Sample Request:**
    ```http
    PATCH https://example.com/api/signal/request_close/cd76bcff-7604-442a-87ac-5a537472701a
    ```

### 4. Request Plant Pick Up

- **Endpoint:** `/signal/request_pick_up/<plant_id>`
- **Method:** `PATCH`
- **Description:** Initiates a pickup request for a specified plant, indicating that the plant is ready for customer collection or delivery.
- **Sample Request:**
    ```http
    PATCH https://example.com/api/signal/request_close/1ce5658a-8690-410a-9b85-d7bcc8d46618
    ```

### 5. Request Payment

- **Endpoint:** `/payment_detail/<plant_id>`
- **Method:** `PATCH`
- **Description:** Requests the payment details for a specified plant, facilitating the financial transaction for purchase.
- **Sample Request:**
    ```http
    PATCH https://example.com/api/signal/request_close/8921bda1-84b6-4e7c-bd60-e2930723b49c
    ```
