# Blogging Website

Welcome to our blogging website! This platform is developed using the MERN stack (MongoDB, Express.js, React, Node.js) with Tailwind CSS for styling. Users can sign up, sign in, create, edit, and delete their blogs, as well as browse all blogs posted on the platform. The website is designed responsively to ensure an optimal viewing experience across various devices.

## Table of Contents
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
- [Features](#features)
- [Technologies Used](#technologies-used)

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) (Atlas or locally)

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/bachewar-bhushan/BlogWeb.git
    ```

2. **Install dependencies:**
    ```bash
    cd BlogWeb
    npm install
    ```

### Configuration

1. Open the `backend/db.js` file.
2. Find the MongoDB connection URL. If using MongoDB Compass, replace the placeholder with your MongoDB Compass connection URL.

### Running the Application

1. **Start the frontend development server:**
    ```bash
    npm start
    ```

2. **Start the Node.js server:**
    ```bash
    npm run backend
    ```

3. Visit [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Features

- User authentication (sign up, sign in, logout)
- Create, edit, and delete your own blogs
- View all blogs
- Responsive design

## Technologies Used

- MongoDB
- Express.js
- React
- Node.js
- Tailwind CSS
