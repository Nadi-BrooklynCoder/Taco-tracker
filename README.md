# Taco Shop CLI

## Overview

This is a command-line interface (CLI) application for managing a taco shop's menu and cart system. It allows users to perform CRUD operations on tacos and manage a shopping cart.

## Features

- List all tacos (`index`)
- Create a new taco (`create`)
- Show details of a specific taco (`show`)
- Update a taco's information (`update`)
- Delete a taco (`destroy`)
- Add items to the cart (`addItem`)
- Cancel the cart (`cancelCart`)

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the necessary dependencies by running `npm install`.

## Usage

The application can be run from the command line with the following commands:

- `node index.js index` - Lists all available tacos.
- `node index.js create <name> <description> <price>` - Creates a new taco with the provided name, description, and price.
- `node index.js show <id>` - Displays the details of a taco by its ID.
- `node index.js update <id> <name> <description> <price>` - Updates the taco with the given ID.
- `node index.js destroy <id>` - Removes the taco with the specified ID from the menu.
- `node index.js addItem <id> <quantity>` - Adds the specified quantity of the taco to the cart.
- `node index.js cancelCart` - Empties the cart.

## Data Structure

Tacos are stored in a JSON file with the following structure:

```json
{
  "tacos": [
    {
      "id": "unique-id",
      "name": "taco name",
      "description": "taco description",
      "price": "taco price"
    }
    // ... more tacos
  ]
}
```

## Stretch Goals

- **Testing**: Implement a comprehensive suite of tests to ensure the reliability and stability of the application.
- **Data Presentation**: Enhance the terminal output formatting to provide a more user-friendly and visually appealing display of data.
- **User Experience**: Continuously improve the interface to make it intuitive and engaging for users, ensuring ease of use and a pleasant interaction with the application.
