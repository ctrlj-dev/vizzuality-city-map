# Next.js 15 Application

This is a Next.js 15 application utilizing the app directory structure. It features static and dynamic pages, organized components, reusable hooks, and more.

## Getting Started

To run the project, use the following commands:

```bash
npm run dev     # Start the development server with Turbopack
npm run build   # Build the application for production
npm run start   # Start the production server
npm run lint    # Lint the codebase
npm run test    # Run tests using Jest
npm run prepare  # Prepare Husky hooks
npm run format   # Format the code using Prettier
npm run lints    # Run ESLint
```

# Application Structure

## 📄 Pages

We use the app directory of Next.js, which includes:

- **Static Page**: The home page.
- **Dynamic Page**: A detail view of each station, accessible via URL parameters.

## 🧩 Components

Components are organized into two main folders:

### `components`

- Contains components organized by functionality (views).
- Includes the main views for networks and stations, exporting the respective views used in their pages.
- Organized with subfolders and utility files specific to each view.

### `ui`

- Contains base components that are reusable throughout the application and should be extended when necessary.

## 📦 Lib

### `config`

- Contains the base URL for the API. This folder can also be used for additional configurations related to build, server, or development.

### `data`

- Contains static data that will be used in the application.

## 🔗 Hooks

- Contains reusable hooks that are not specific to a single view, promoting code reuse.

## 🌐 Services

- Contains API calls and data mappers. Leveraging Next.js's server-side capabilities allows us to map data on the server before it reaches the client, extracting only the necessary information.

## 🏷️ Types

- Defines type annotations for data received from the server and what is displayed on the frontend.

## 🛠️ Utils

- Contains various utility functions that can be used throughout the application.

## ✅ Tests

- Functionality and logic have been tested. UI components without variations in logic have not been tested, as they are considered to be pre-tested by their respective libraries. Coverage is not 100%.

## ⚙️ State Management

- Both views are structured using contexts to maintain a single source of truth and avoid prop drilling.

## 🗺️ Mapbox Token

- The application uses the `NEXT_PUBLIC_MAPBOX_TOKEN` environment variable to set the public Mapbox token. For more information on how to set up and use Mapbox, refer to the [Mapbox documentation](https://docs.mapbox.com/).
