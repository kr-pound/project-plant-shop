# Staff API Documentation

## Introduction

This section of the documentation focuses on the API endpoints related to staff operations. These endpoints basically allow for staff authentication.

## Sample Base URL

You may use the following base URLs for API requests:

- Local Setup: `http://localhost:3002/api`
- Deployment: `https://example.com/api`

## "Staffs" API Endpoints

### 1. Validate Staffs Login

- **Endpoint:** `/staffs`
- **Method:** `POST`
- **Description:** Authenticates staff members by validating their usernames and passwords.
- **Body Parameters:**
    - `username`: string - The staff member's username.
    - `password`: string - The staff member's password.
- **Sample Request:**
    ```http
    POST https://example.com/api/staffs
    ```
- **Sample Body:**
    ```json
    {
        "username": "admin",
        "password": "123456"
    }
    ```
- **Sample Response (200 OK):**
    ```json
    {
        "id": "00000000-0000-4000-8000-000000000000",
        "username": "admin"
    }
    ```

    <details>
    <summary><i><strong>Body Missing (400 Bad Request)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Request body is missing or empty."
    > }
    > ```
        
    </details>

    <details>
    <summary><i><strong>Invalid User or Password (401 Unauthorized)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Invalid Username or Password."
    > }
    > ```
        
    </details>
