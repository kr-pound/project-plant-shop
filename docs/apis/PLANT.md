# Plant API Documentation

## Introduction

This part of the document outlines the APIs for managing plants. It includes endpoints for creating, retrieving, updating, and deleting plant information, along with their associated images and pricing details.

## Sample Base URL

You may use the following base URLs for API requests:

- Local Setup: `http://localhost:3002/api`
- Deployment: `https://example.com/api`

## "Plants" API Endpoints

This part of the document outlines the APIs for managing plants. It includes endpoints for creating, retrieving, updating, and deleting plant information, along with their associated images and pricing details.

### 1. Create Plant

- **Endpoint:** `/plants`
- **Method:** `POST`
- **Description:** Registers a new plant in the system, associating it with a specific slot and plant type, and includes its image and price.
- **Query Parameters:**
    - `machine_id`: string - The unique identifier of the machine where the plant is located.
- **Body Parameters:**
    - `plant_type_id`: string - The identifier for the type of plant being added.
    - `slot_id`: string - The identifier for the slot where the plant is placed.
    - `price`: number - The price of the plant.
    - `image_name`: string (optional) - The name of the image file for the plant.
    - `image`: string - A base64-encoded string of the plant's image.
- **Sample Request:**
    ```http
    POST https://example.com/api/plants?machine_id=5640df79-df4f-4f23-9bc1-ec92c0974faa
    ```
- **Sample Body:**
    ```json
    {
        "plant_type_id": "5635bf0c-4911-433d-b3bc-1a0d4edbec16",
        "slot_id": "df442c95-fa26-42b1-bd4d-428b3b0d73cb",
        "price": 750,
        "image_name": "snake-plant.png",
        "image": "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII="
    }
    ```
- **Sample Response (200 OK):**
    ```json
    {
        "id": "9346a1ac-baae-49d8-9011-561670503cd9",
        "plant_type": {
            "id": "5635bf0c-4911-433d-b3bc-1a0d4edbec16",
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
            "document": "https://example.com/public/documents/SnakePlant-1708588712366.pdf"
        },
        "plant_state": {
            "id": "438c1e86-95b2-4e24-af48-a394dcb18993",
            "name": "pending",
            "description": "data is complete but no actual plant"
        },
        "slot": {
            "id": "df442c95-fa26-42b1-bd4d-428b3b0d73cb",
            "slot_code": "A01",
            "slot_state": {
                "id": "93e6b97f-687a-491e-b0a6-6013cc5a2848",
                "name": "occupied",
                "description": null
            },
            "location_id": "5640df79-df4f-4f23-9bc1-ec92c0974faa"
        },
        "location": {
            "id": "5640df79-df4f-4f23-9bc1-ec92c0974faa",
            "name": "Siam Plant Hub",
            "description": "Located at Siam Square, take the BTS Skytrain to Siam station and exit via gate 4.",
            "deleted_at": null
        },
        "price": 750,
        "image_name": "snake-plant.png",
        "image": "https://example.com/public/documents/SnakePlant-1708601904137.png"
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
    <summary><i><strong>Body Missing (400 Bad Request)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Request body is missing or empty."
    > }
    > ```
        
    </details>

    <details>
    <summary><i><strong>Not Found fk `plant_type_id` (404 Not Found)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Foreign ID not found: plant_type"
    > }
    > ```
        
    </details>

    <details>
    <summary><i><strong>Not Found fk `slot_id` (404 Not Found)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Foreign ID not found: slot"
    > }
    > ```
        
    </details>

### 2. Get All Plants

- **Endpoint:** `/plants`
- **Method:** `GET`
- **Description:** Retrieves a list of all plants in the system, with options to filter by machine, category, and sort by specific attributes.
- **Query Parameters:**
    - `machine_id`: string - ID of the machine performing the operation.
    - `category_id`: string (optional) - Filters plants by their category.
    - `sortby`: string (optional) - Attribute name to sort the plants by. (`name`, `price`, or `date`)
    - `order`: string (optional) - The order of sorting, either `asc` for ascending or `desc` for descending.
    - `search`: string (optional) - A search keyword to find plants.
- **Sample Request:**
    ```http
    GET https://example.com/api/plants?machine_id=5640df79-df4f-4f23-9bc1-ec92c0974faa&sortby=date&order=desc
    ```
- **Sample Response (200 OK):**
    ```json
    [
        {
            "id": "b775cfee-5bc6-44ac-8be8-7f456764c02f",
            "plant_type": {
                "id": "8e20787b-070c-4360-9d12-a9584bcaa761",
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
                "document": "https://example.com/public/documents/SpiderPlant-1708588797495.pdf"
            },
            "plant_state": {
                "id": "438c1e86-95b2-4e24-af48-a394dcb18993",
                "name": "pending",
                "description": "data is complete but no actual plant"
            },
            "slot": {
                "id": "cb4bda69-6ce2-4493-b011-7a20e6285908",
                "slot_code": "A02",
                "slot_state": {
                    "id": "93e6b97f-687a-491e-b0a6-6013cc5a2848",
                    "name": "occupied",
                    "description": null
                },
                "location_id": "5640df79-df4f-4f23-9bc1-ec92c0974faa"
            },
            "location": {
                "id": "5640df79-df4f-4f23-9bc1-ec92c0974faa",
                "name": "Siam Plant Hub",
                "description": "Located at Siam Square, take the BTS Skytrain to Siam station and exit via gate 4.",
                "deleted_at": null
            },
            "price": 550,
            "image_name": "spider-plant.jpg",
            "image": "https://example.com/public/documents/SpiderPlant-1708602075363.jpg",
            "created_at": "2024-02-22T11:41:15.369Z"
        },
        {
            "id": "9346a1ac-baae-49d8-9011-561670503cd9",
            "plant_type": {
                "id": "5635bf0c-4911-433d-b3bc-1a0d4edbec16",
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
                "document": "https://example.com/public/documents/SnakePlant-1708588712366.pdf"
            },
            "plant_state": {
                "id": "438c1e86-95b2-4e24-af48-a394dcb18993",
                "name": "pending",
                "description": "data is complete but no actual plant"
            },
            "slot": {
                "id": "df442c95-fa26-42b1-bd4d-428b3b0d73cb",
                "slot_code": "A01",
                "slot_state": {
                    "id": "93e6b97f-687a-491e-b0a6-6013cc5a2848",
                    "name": "occupied",
                    "description": null
                },
                "location_id": "5640df79-df4f-4f23-9bc1-ec92c0974faa"
            },
            "location": {
                "id": "5640df79-df4f-4f23-9bc1-ec92c0974faa",
                "name": "Siam Plant Hub",
                "description": "Located at Siam Square, take the BTS Skytrain to Siam station and exit via gate 4.",
                "deleted_at": null
            },
            "price": 750,
            "image_name": "snake-plant.png",
            "image": "https://example.com/public/documents/SnakePlant-1708601904137.png",
            "created_at": "2024-02-22T11:38:24.159Z"
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

### 3. Get Plant

- **Endpoint:** `/plants/<plant_id>`
- **Method:** `GET`
- **Description:** Fetches information about a specific plant, including its type, care instructions, price, and image.
- **Query Parameters:**
    - `machine_id`: string - The unique identifier of the machine where the plant is located.
- **Sample Request:**
    ```http
    GET https://example.com/api/plants/b775cfee-5bc6-44ac-8be8-7f456764c02f?machine_id=5640df79-df4f-4f23-9bc1-ec92c0974faa
    ```
- **Sample Response (200 OK):**
    ```json
    {
        "id": "b775cfee-5bc6-44ac-8be8-7f456764c02f",
        "plant_type": {
            "id": "8e20787b-070c-4360-9d12-a9584bcaa761",
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
            "document": "https://example.com/public/documents/SpiderPlant-1708588797495.pdf"
        },
        "plant_state": {
            "id": "438c1e86-95b2-4e24-af48-a394dcb18993",
            "name": "pending",
            "description": "data is complete but no actual plant"
        },
        "slot": {
            "id": "cb4bda69-6ce2-4493-b011-7a20e6285908",
            "slot_code": "A02",
            "slot_state": {
                "id": "93e6b97f-687a-491e-b0a6-6013cc5a2848",
                "name": "occupied",
                "description": null
            },
            "location_id": "5640df79-df4f-4f23-9bc1-ec92c0974faa"
        },
        "location": {
            "id": "5640df79-df4f-4f23-9bc1-ec92c0974faa",
            "name": "Siam Plant Hub",
            "description": "Located at Siam Square, take the BTS Skytrain to Siam station and exit via gate 4.",
            "deleted_at": null
        },
        "price": 550,
        "image_name": "spider-plant.jpg",
        "image": "https://example.com/public/documents/SpiderPlant-1708602075363.jpg"
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
    <summary><i><strong>Not Found Plant ID (404 Not Found)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "PlantWithDetail not found."
    > }
    > ```
        
    </details>

### 4. Update Plant

- **Endpoint:** `/plants/<plant_id>`
- **Method:** `PUT`
- **Description:** 
- **Query Parameters:**
    - `machine_id`: Updates the details of an existing plant, including its type, slot, price, and image.
- **Body Parameters:**
    - `plant_type_id`: string - The updated identifier for the type of plant.
    - `slot_id`: string - The updated identifier for the slot where the plant is placed.
    - `price`: number - The updated price of the plant.
    - `image_name`: string (optional) - The updated name of the image file for the plant.
    - `image`: string (optional) - A new base64-encoded string of the plant's image.
- **Sample Request:**
    ```http
    PUT https://example.com/api/plants/b775cfee-5bc6-44ac-8be8-7f456764c02f?machine_id=5640df79-df4f-4f23-9bc1-ec92c0974faa
    ```
- **Sample Body:**
    ```json
    {
        "plant_type_id": "b775cfee-5bc6-44ac-8be8-7f456764c02f",
        "slot_id": "cb4bda69-6ce2-4493-b011-7a20e6285908",
        "price": 550,
        "image_name": "spider-plant.jpg",
        "image": "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII="
    }
    ```
- **Sample Response (200 OK):**
    ```json
    {
        "id": "b775cfee-5bc6-44ac-8be8-7f456764c02f",
        "plant_type": {
            "id": "8e20787b-070c-4360-9d12-a9584bcaa761",
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
            "document": "https://example.com/public/documents/SpiderPlant-1708588797495.pdf"
        },
        "plant_state": {
            "id": "438c1e86-95b2-4e24-af48-a394dcb18993",
            "name": "pending",
            "description": "data is complete but no actual plant"
        },
        "slot": {
            "id": "cb4bda69-6ce2-4493-b011-7a20e6285908",
            "slot_code": "A02",
            "slot_state": {
                "id": "93e6b97f-687a-491e-b0a6-6013cc5a2848",
                "name": "occupied",
                "description": null
            },
            "location_id": "5640df79-df4f-4f23-9bc1-ec92c0974faa"
        },
        "location": {
            "id": "5640df79-df4f-4f23-9bc1-ec92c0974faa",
            "name": "Siam Plant Hub",
            "description": "Located at Siam Square, take the BTS Skytrain to Siam station and exit via gate 4.",
            "deleted_at": null
        },
        "price": 550,
        "image_name": "spider-plant.jpg",
        "image": "https://example.com/public/documents/SpiderPlant-1708603320412.jpg"
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
    <summary><i><strong>Not Found Plant ID (404 Not Found)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "PlantWithDetail not found."
    > }
    > ```
        
    </details>

    <details>
    <summary><i><strong>Not Found fk `plant_type_id` (404 Not Found)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Foreign ID not found: plant_type"
    > }
    > ```
        
    </details>

    <details>
    <summary><i><strong>Not Found fk `slot_id` (404 Not Found)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "Foreign ID not found: slot"
    > }
    > ```
        
    </details>

### 5. Delete Plant

- **Endpoint:** `/plants/<plant_id>`
- **Method:** `DELETE`
- **Description:** Removes a plant from the system, including all associated data such as its type, slot, and image.
- **Query Parameters:**
    - `machine_id`: string - The unique identifier of the machine where the plant is located.
- **Sample Request:**
    ```http
    DELETE https://example.com/api/plants/9346a1ac-baae-49d8-9011-561670503cd9?machine_id=5640df79-df4f-4f23-9bc1-ec92c0974faa
    ```
- **Sample Response (200 OK):**
    ```json
    {
        "id": "9346a1ac-baae-49d8-9011-561670503cd9",
        "plant_type": {
            "id": "5635bf0c-4911-433d-b3bc-1a0d4edbec16",
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
            "document": "https://example.com/public/documents/SnakePlant-1708588712366.pdf"
        },
        "plant_state": {
            "id": "438c1e86-95b2-4e24-af48-a394dcb18993",
            "name": "pending",
            "description": "data is complete but no actual plant"
        },
        "slot": {
            "id": "df442c95-fa26-42b1-bd4d-428b3b0d73cb",
            "slot_code": "A01",
            "slot_state": {
                "id": "744066fd-4ae4-4967-9011-2c51afb139a0",
                "name": "empty",
                "description": null
            },
            "location_id": "5640df79-df4f-4f23-9bc1-ec92c0974faa"
        },
        "location": {
            "id": "5640df79-df4f-4f23-9bc1-ec92c0974faa",
            "name": "Siam Plant Hub",
            "description": "Located at Siam Square, take the BTS Skytrain to Siam station and exit via gate 4.",
            "deleted_at": null
        },
        "price": 750,
        "image_name": "snake-plant.png",
        "image": "https://example.com/public/documents/SnakePlant-1708601904137.png"
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
    <summary><i><strong>Not Found Plant ID (404 Not Found)</strong> (click to expand)</i></summary>

    > ```json
    > {
    >   "exception": "PlantWithDetail not found."
    > }
    > ```
        
    </details>
