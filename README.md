```markdown
https://youtu.be/_60w0DBoKLY

# MapsHackathon

MapsHackathon is a web-based application that integrates Google Maps with Three.js to render a map with additional 3D graphics. The primary function of the application is to display an interactive map centered on San Francisco, allowing users to rotate the map view and visualize 3D objects within the map. The application leverages React for building the user interface, Google Maps API for map rendering, and Three.js for adding 3D graphics, providing a visually engaging and interactive map experience with additional 3D elements.

## Overview

MapsHackathon is built using modern web technologies to ensure a robust and scalable architecture. The key technologies used in this project are:
- **React**: For building the user interface.
- **Google Maps API**: For rendering the map.
- **Three.js**: For rendering 3D graphics within the map.
- **Vite**: As the build tool to provide a fast and lean development experience.
- **ESLint**: For linting and enforcing coding standards.

### Project Structure
```
MapsHackathon/
├── public/
│   ├── models/
│   │   └── sample_model.glb
│   ├── draco/
│   │   └── README.md
│   └── .gitkeep
├── src/
│   ├── assets/
│   │   └── .gitkeep
│   ├── components/
│   │   ├── GLBModelOverlay.jsx
│   │   └── Map.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── config.js
│   ├── index.css
│   └── main.jsx
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Features

1. **Interactive Map Display**:
   - Displays a Google Map centered on San Francisco with satellite view and various map controls enabled (zoom, map type control, rotate control, scale control).
   - The map is displayed in a 45-degree perspective view by default.

2. **3D Graphics Integration**:
   - Integrates Three.js to render a 3D scene within the map.
   - A simple rotating cube is rendered on top of the map as a demonstration of Three.js capabilities.

3. **Map Rotation Controls**:
   - Users can rotate the map view using "Rotate Left" and "Rotate Right" buttons.
   - The map view is rotated in 90-degree increments.

4. **Loading State**:
   - Displays a loading message until the Google Maps API is fully loaded.

5. **Custom 3D Model Overlay**:
   - Users can overlay their own GLB 3D models onto the 3D maps.
   - Supports 3D storytelling for areas where 3D models are overlaid.
   - Utilizes Google photorealistic 3D tiles if possible, leveraging the provided API.

## Getting started

### Requirements

To run this project, you need to have the following technologies installed on your computer:
- **Node.js**: JavaScript runtime for building apps.
- **npm**: Node package manager to install dependencies.

### Quickstart

1. **Clone the repository**:
    ```sh
    git clone <repository-url>
    cd MapsHackathon
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Add Google Maps API Key**:
    - Open `src/config.js` and replace `'AIzaSyDgUtO-QtZfRHq1mARfb3U-G_FNCM_ySN8'` with your Google Maps API key.

4. **Start the development server**:
    ```sh
    npm run dev
    ```

5. **Build the project for production**:
    ```sh
    npm run build
    ```

6. **Preview the production build**:
    ```sh
    npm run preview
    ```

7. **Lint the project files**:
    ```sh
    npm run lint
    ```

### License

The project is proprietary (not open source). Copyright (c) 2024.
```
