# Plant Type API Documentation

## Introduction

This part of the document outlines the APIs for managing plant types. It includes endpoints for creating, retrieving, updating, and deleting plant types, along with their care instructions.

## Sample Base URL

You may use the following base URLs for API requests:

- Local Setup: `http://localhost:3002/api`
- Deployment: `https://example.com/api`

## "Plant Types" API Endpoints

### 1. Create Plant Type with Care

- **Endpoint:** `/plant_types`
- **Method:** `POST`
- **Description:** Adds a new plant type to the system, including details about its care requirements.
- **Body Parameters:**
    - `name`: string - The common name of the plant.
    - `description`: string - A brief description of the plant.
    - `category_id`: string - The identifier for the plant's category.
    - `preset_id`: string - The identifier for the care preset associated with the plant.
    - `watering_period`: integer - The recommended number of days between watering.
    - `document_name`: string - The name of the document containing care instructions.
    - `document`: string - A base64-encoded string of the document's contents.
- **Sample Request:**
    ```http
    POST https://example.com/api/plant_types
    ```
- **Sample Body:**
    ```json
    {
        "name": "Snake Plant",
        "description": "A hardy, low-maintenance plant that can tolerate low light conditions.",
        "category_id": "47a2cf72-c89f-4ba9-8f0e-3943bd0c5132",
        "preset_id": "d780544a-ab05-4490-8342-e6badbfbc171",
        "watering_period": 14,
        "document_name": "snake-plant.pdf",
        "document": "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII="
    }
    ```
- **Sample Response (200 OK):**
    ```json
    {
        "id": "141f28e8-8abb-4341-87f0-a2f1201fd2fd",
        "name": "Snake Plant",
        "description": "A hardy, low-maintenance plant that can tolerate low light conditions.",
        "category": {
            "id": "47a2cf72-c89f-4ba9-8f0e-3943bd0c5132",
            "name": "indoor",
            "description": null
        },
        "preset": {
            "id": "d780544a-ab05-4490-8342-e6badbfbc171",
            "intensity": {
                "id": "b42a6afa-dca8-4ee6-bf41-2cf4710e12b2",
                "name": "Indirect"
            },
            "lighting": {
                "id": "f4d11729-d404-4936-8c80-821bcc64e8d8",
                "name": "Low Light",
                "description": "2 - 3 hours / day"
            }
        },
        "watering_period": 14,
        "next_due": "2024-03-06T17:00:00.000Z",
        "document_name": "snake-plant.pdf",
        "document": "https://example.com/public/documents/SnakePlant-1708576465164.pdf"
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
    <summary><i><strong>Not Found fk `category_id` (404 Not Found)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Foreign ID not found: category_id"
    > }
    > ```
        
    </details>

    <details>
    <summary><i><strong>Not Found fk `preset_id` (404 Not Found)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Foreign ID not found: preset_id"
    > }
    > ```
        
    </details>

### 2. Get All Plant Types with Cares

- **Endpoint:** `/plant_types`
- **Method:** `GET`
- **Description:** Retrieves a list of all plant types along with their care information.
- **Query Parameters:**
    - `category_id`: string (optional) - Filters plant types by category.
    - `sortby`: string (optional) - The attribute to sort the list by (e.g., `name`).
    - `order`: string (optional) - Sort order (`asc` for ascending, `desc` for descending).
- **Sample Request:**
    ```http
    GET https://example.com/api/plant_types?category_id=47a2cf72-c89f-4ba9-8f0e-3943bd0c5132&sortby=name&order=asc
    ```
- **Sample Response (200 OK):**
    ```json
    [
        {
            "id": "8e72363a-de1c-4635-8828-f263cdfcffa2",
            "name": "Peace Lily",
            "description": "A popular indoor plant with elegant white blooms that prefers medium light.",
            "category": {
                "id": "47a2cf72-c89f-4ba9-8f0e-3943bd0c5132",
                "name": "indoor",
                "description": null
            },
            "preset": {
                "id": "50f89657-cc40-44bd-97b8-256e580cf289",
                "intensity": {
                    "id": "22927165-ed75-46f7-bb84-a0b898bd8d14",
                    "name": "Direct"
                },
                "lighting": {
                    "id": "8e9259d6-230d-43ee-8313-180ecbcf3fcd",
                    "name": "Partial Sun",
                    "description": "3 - 6 hours / day"
                }
            },
            "watering_period": 7,
            "next_due": "2024-02-28T17:00:00.000Z",
            "document_name": "peace-lily.pdf",
            "document": "https://example.com/public/documents/PeaceLily-1708577067625.pdf"
        },
        {
            "id": "141f28e8-8abb-4341-87f0-a2f1201fd2fd",
            "name": "Snake Plant",
            "description": "A hardy, low-maintenance plant that can tolerate low light conditions.",
            "category": {
                "id": "47a2cf72-c89f-4ba9-8f0e-3943bd0c5132",
                "name": "indoor",
                "description": null
            },
            "preset": {
                "id": "d780544a-ab05-4490-8342-e6badbfbc171",
                "intensity": {
                    "id": "b42a6afa-dca8-4ee6-bf41-2cf4710e12b2",
                    "name": "Indirect"
                },
                "lighting": {
                    "id": "f4d11729-d404-4936-8c80-821bcc64e8d8",
                    "name": "Low Light",
                    "description": "2 - 3 hours / day"
                }
            },
            "watering_period": 14,
            "next_due": "2024-03-06T17:00:00.000Z",
            "document_name": "snake-plant.pdf",
            "document": "https://example.com/public/documents/SnakePlant-1708576465164.pdf"
        },
        {
            "id": "b6b9a236-8ef9-4719-b27b-7fd45a8b181f",
            "name": "Spider Plant",
            "description": "An air-purifying plant that is easy to care for and propagate.",
            "category": {
                "id": "47a2cf72-c89f-4ba9-8f0e-3943bd0c5132",
                "name": "indoor",
                "description": null
            },
            "preset": {
                "id": "97007e9d-54d3-4a12-91f5-96c7a19daecb",
                "intensity": {
                    "id": "b42a6afa-dca8-4ee6-bf41-2cf4710e12b2",
                    "name": "Indirect"
                },
                "lighting": {
                    "id": "9adf7269-ff25-4bf6-ad00-aa05ada7e249",
                    "name": "Partial Shade",
                    "description": "3 - 6 hours / day"
                }
            },
            "watering_period": 10,
            "next_due": "2024-03-02T17:00:00.000Z",
            "document_name": "spider-plant.pdf",
            "document": "https://example.com/public/documents/SpiderPlant-1708577061399.pdf"
        }
    ]
    ```

    <details>
    <summary><i><strong>Invalid Param `category_id` (400 Bad Request)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Paramer 'category_id' is an invalid ID format."
    > }
    > ```
        
    </details>

    <details>
    <summary><i><strong>Not Found Param `category_id` (404 Not Found)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Not found: category_id"
    > }
    > ```
        
    </details>

### 3. Get Plant Type with Care

- **Endpoint:** `/plant_types/<plant_type_id>`
- **Method:** `GET`
- **Description:** Fetches detailed information about a specific plant type, including its care instructions.
- **Sample Request:**
    ```http
    GET https://example.com/api/plant_types/141f28e8-8abb-4341-87f0-a2f1201fd2fd
    ```
- **Sample Response (200 OK):**
    ```json
    {
        "id": "141f28e8-8abb-4341-87f0-a2f1201fd2fd",
        "name": "Snake Plant",
        "description": "A hardy, low-maintenance plant that can tolerate low light conditions.",
        "category": {
            "id": "47a2cf72-c89f-4ba9-8f0e-3943bd0c5132",
            "name": "indoor",
            "description": null
        },
        "preset": {
            "id": "d780544a-ab05-4490-8342-e6badbfbc171",
            "intensity": {
                "id": "b42a6afa-dca8-4ee6-bf41-2cf4710e12b2",
                "name": "Indirect"
            },
            "lighting": {
                "id": "f4d11729-d404-4936-8c80-821bcc64e8d8",
                "name": "Low Light",
                "description": "2 - 3 hours / day"
            }
        },
        "watering_period": 14,
        "next_due": "2024-03-06T17:00:00.000Z",
        "document_name": "snake-plant.pdf",
        "document": "https://example.com/public/documents/SnakePlant-1708576465164.pdf"
    }
    ```

    <details>
    <summary><i><strong>Invalid ID (400 Bad Request)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Invalid ID format."
    > }
    > ```
        
    </details>

    <details>
    <summary><i><strong>Not Found Plant Type ID (404 Not Found)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "TypeWithCare not found."
    > }
    > ```
        
    </details>

### 4. Update Plant Type with Care

- **Endpoint:** `/plant_types/<plant_type_id>`
- **Method:** `PUT`
- **Description:** Updates the information for an existing plant type, including its care details.
- **Body Parameters:**
    - `name`: string - Updated name of the plant.
    - `description`: string - Updated description of the plant.
    - `category_id`: string - Updated category identifier for the plant.
    - `preset_id`: string - Updated care preset identifier.
    - `watering_period`: integer - Updated watering frequency in days.
    - `document_name`: string (optional) - Updated document name with care instructions.
    - `document`: string (optional) - Updated base64-encoded document content.
- **Sample Request:**
    ```http
    PUT https://example.com/api/plant_types/b6b9a236-8ef9-4719-b27b-7fd45a8b181f
    ```
- **Sample Body:**
    ```json
    {
        "name": "Spider Plant",
        "description": "An air-purifying plant that is easy to care for and propagate.",
        "category_id": "47a2cf72-c89f-4ba9-8f0e-3943bd0c5132",
        "preset_id": "97007e9d-54d3-4a12-91f5-96c7a19daecb",
        "watering_period": 15,
        "document_name": "spider-plant.pdf",
        "document": "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII="
    }
    ```
- **Sample Response (200 OK):**
    ```json
    {
        "id": "b6b9a236-8ef9-4719-b27b-7fd45a8b181f",
        "name": "Spider Plant",
        "description": "An air-purifying plant that is easy to care for and propagate.",
        "category": {
            "id": "47a2cf72-c89f-4ba9-8f0e-3943bd0c5132",
            "name": "indoor",
            "description": null
        },
        "preset": {
            "id": "97007e9d-54d3-4a12-91f5-96c7a19daecb",
            "intensity": {
                "id": "b42a6afa-dca8-4ee6-bf41-2cf4710e12b2",
                "name": "Indirect"
            },
            "lighting": {
                "id": "9adf7269-ff25-4bf6-ad00-aa05ada7e249",
                "name": "Partial Shade",
                "description": "3 - 6 hours / day"
            }
        },
        "watering_period": 15,
        "next_due": "2024-03-07T17:00:00.000Z",
        "document_name": "spider-plant.pdf",
        "document": "https://example.com/public/documents/SpiderPlant-1708587966061.pdf"
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
    <summary><i><strong>Invalid ID (400 Bad Request)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Invalid ID format."
    > }
    > ```
        
    </details>

    <details>
    <summary><i><strong>Not Found Plant Type ID (404 Not Found)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "TypeWithCare not found."
    > }
    > ```
        
    </details>

    <details>
    <summary><i><strong>Not Found fk `category_id` (404 Not Found)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Foreign ID not found: category_id"
    > }
    > ```
        
    </details>

    <details>
    <summary><i><strong>Not Found fk `preset_id` (404 Not Found)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Foreign ID not found: preset_id"
    > }
    > ```
        
    </details>

### 5. Delete Plant Type with Care

- **Endpoint:** `/plant_types/<plant_type_id>`
- **Method:** `DELETE`
- **Description:** Removes a plant type and its associated care instructions from the system.
- **Sample Request:**
    ```http
    DELETE https://example.com/api/plant_types/b6b9a236-8ef9-4719-b27b-7fd45a8b181f
    ```
- **Sample Response (200 OK):**
    ```json
    {
        "id": "b6b9a236-8ef9-4719-b27b-7fd45a8b181f",
        "name": "Spider Plant",
        "description": "An air-purifying plant that is easy to care for and propagate.",
        "category": {
            "id": "47a2cf72-c89f-4ba9-8f0e-3943bd0c5132",
            "name": "indoor",
            "description": null
        },
        "preset": {
            "id": "97007e9d-54d3-4a12-91f5-96c7a19daecb",
            "intensity": {
                "id": "b42a6afa-dca8-4ee6-bf41-2cf4710e12b2",
                "name": "Indirect"
            },
            "lighting": {
                "id": "9adf7269-ff25-4bf6-ad00-aa05ada7e249",
                "name": "Partial Shade",
                "description": "3 - 6 hours / day"
            }
        },
        "watering_period": 15,
        "next_due": "2024-03-07T17:00:00.000Z",
        "document_name": "spider-plant.pdf",
        "document": "https://example.com/public/documents/SpiderPlant-1708587966061.pdf"
    }
    ```

    <details>
    <summary><i><strong>Invalid ID (400 Bad Request)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Invalid ID format."
    > }
    > ```
        
    </details>

    <details>
    <summary><i><strong>Not Found Plant Type ID (404 Not Found)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "TypeWithCare not found."
    > }
    > ```
        
    </details>

### 6. Delete All Plant Types with Cares

- **Endpoint:** `/plant_types`
- **Method:** `DELETE`
- **Description:** Deletes all plant types and their care instructions from the system.
- **Sample Request:**
    ```http
    DELETE https://example.com/api/plant_types
    ```
- **Sample Response (200 OK):**
    ```json
    [
        {
            "id": "141f28e8-8abb-4341-87f0-a2f1201fd2fd",
            "name": "Snake Plant",
            "description": "A hardy, low-maintenance plant that can tolerate low light conditions.",
            "category": {
                "id": "47a2cf72-c89f-4ba9-8f0e-3943bd0c5132",
                "name": "indoor",
                "description": null
            },
            "preset": {
                "id": "d780544a-ab05-4490-8342-e6badbfbc171",
                "intensity": {
                    "id": "b42a6afa-dca8-4ee6-bf41-2cf4710e12b2",
                    "name": "Indirect"
                },
                "lighting": {
                    "id": "f4d11729-d404-4936-8c80-821bcc64e8d8",
                    "name": "Low Light",
                    "description": "2 - 3 hours / day"
                }
            },
            "watering_period": 14,
            "next_due": "2024-03-06T17:00:00.000Z",
            "document_name": "snake-plant.pdf",
            "document": "https://example.com/public/documents/SnakePlant-1708576465164.pdf"
        },
        {
            "id": "8e72363a-de1c-4635-8828-f263cdfcffa2",
            "name": "Peace Lily",
            "description": "A popular indoor plant with elegant white blooms that prefers medium light.",
            "category": {
                "id": "47a2cf72-c89f-4ba9-8f0e-3943bd0c5132",
                "name": "indoor",
                "description": null
            },
            "preset": {
                "id": "50f89657-cc40-44bd-97b8-256e580cf289",
                "intensity": {
                    "id": "22927165-ed75-46f7-bb84-a0b898bd8d14",
                    "name": "Direct"
                },
                "lighting": {
                    "id": "8e9259d6-230d-43ee-8313-180ecbcf3fcd",
                    "name": "Partial Sun",
                    "description": "3 - 6 hours / day"
                }
            },
            "watering_period": 7,
            "next_due": "2024-02-28T17:00:00.000Z",
            "document_name": "peace-lily.pdf",
            "document": "https://example.com/public/documents/PeaceLily-1708577067625.pdf"
        }
    ]
    ```

### 7. Get All Available Plant Types

- **Endpoint:** `/plant_types/available_lists`
- **Method:** `GET`
- **Description:** Retrieves a list of plant types that are currently available, filtering out any that have been discontinued or are out of stock.
- **Sample Request:**
    ```http
    GET https://example.com/api/plant_types/available_lists
    ```
- **Sample Response (200 OK):**
    ```json
    [
        {
            "id": "5635bf0c-4911-433d-b3bc-1a0d4edbec16",
            "name": "Snake Plant",
            "description": "A hardy, low-maintenance plant that can tolerate low light conditions.",
            "category_id": "47a2cf72-c89f-4ba9-8f0e-3943bd0c5132"
        },
        {
            "id": "8e20787b-070c-4360-9d12-a9584bcaa761",
            "name": "Spider Plant",
            "description": "An air-purifying plant that is easy to care for and propagate.",
            "category_id": "47a2cf72-c89f-4ba9-8f0e-3943bd0c5132"
        }
    ]
    ```
