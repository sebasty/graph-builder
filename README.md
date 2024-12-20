### Prerequisites
Node.js version: v22.12.0 
npm: v10.9.2 
React: ^19.0.0
Install booth.

### React development environment set up.
Clone the Repository
git clone git@github.com:sebasty/graph-builder.git
cd graph-builder

### Install Dependencies
npm install

### Start the Development Server
npm start

### View in Browser
Open your browser and navigate to: http://localhost:3000

### Node Graph Application Documentation
## Overview
This application allows users to create, move, and connect nodes (circles and squares) dynamically on a canvas. The nodes can be connected via lines, and the connections are maintained as nodes are moved. Additionally, users can delete nodes and their associated connections. The application is responsive and adjusts to various screen sizes.

### Features

## 1. Create Nodes
Add circle or square nodes via buttons from the palette.
Nodes are placed randomly within the canvas.

## 2. Delete Nodes
Option 1: Right-click on a node to delete it.
Option 2: Use the "Remove Node" button to delete the currently selected node.

## 3. Connect Nodes
To connect 2 nodes:
1. Click on one node.
2. Click "CONNECT NODES" button. 
3. Button will turn "green" and will show ON instead of OFF.
4. Click on the second node you want to connect whit.
Node are connected via a line.
Connections are maintained even when nodes are moved.
All Nodes can be connected between them using same strategy.

## 4. Move Nodes
Drag and drop nodes to move them within the canvas.
Lines connecting nodes update dynamically during movement.

## 5. Responsive Design
Canvas and UI adjust dynamically to various screen sizes.
Buttons stack vertically on smaller screens for better accessibility.

### Docker Deployment

## Install Docker on your machine.

## Build the image:
run this command -> docker build -t node-graph-app .

## Run the Docker Container
run this command -> docker run -d -p 8080:8080 --name node-graph-container node-graph-app

## Verify it’s running:
run this command -> docker ps

You should see an entry for node-graph-container with the following details:
Image: node-graph-app
Port Bindings: 0.0.0.0:8080->8080/tcp

## Run the Docker Container
Start the container and map port 8080:

#### Project should be available at http://localhost:8080/ as requested
