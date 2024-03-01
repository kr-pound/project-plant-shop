# Project API Documentation

## Introduction

This documentation provides an overview of all Application Programming Interfaces (APIs) available in the `project-plant-shop` backend. These APIs facilitate interaction with our services, allowing for data retrieval and operational tasks.

To ensure ease of navigation and clarity, the API documentation is divided into separate files based on their functional areas:

## Documentation Structure

- **[Staff API Documentation (`STAFF.md`)](./apis/STAFF.md)**: Detailed information on APIs related to staff operations, including authentication.
- **[Machine API Documentation (`MACHINE.md`)](./apis/MACHINE.md)**: Documentation on machine-related operations, such as creation, update, and deletion of machine records and their locations.
- **[Slot API Documentation (`SLOT.md`)](./apis/SLOT.md)**: Retrieve slots data within each machine, including the slot status.
- **[Plant Type API Documentation (`PLANT_TYPE.md`)](./apis/PLANT_TYPE.md)**: Provides information on managing plant types, including creation, modification, and categorization of plants. This section is essential for inventory classification and organization.
- **[Plant API Documentation (`PLANT.md`)](./apis/PLANT.md)**: Details APIs for managing individual plant records, tracking plant status, and managing inventory. It includes endpoints for adding new plants, updating plant status, and processing sales.
- **[Communication API (`COMMUNICATION.md`)](./apis/COMMUNICATION.md)**: Describes the APIs for machine-to-server communication, including purchase confirmations.

## Sample Base URL

You may use the following base URLs for API requests:

- Local Setup: `http://localhost:3002/api`
- Deployment: `https://example.com/api`
