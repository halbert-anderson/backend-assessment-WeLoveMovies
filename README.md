# WeLoveMovies API
## Overview
Welcome to the WeLoveMovies backend API! This API provides movie-related data such as movies, theaters, critics, and reviews. In this project I set up the database and build out the routes necessary for accessing the data. The API is built using Node.js, Express, Knex.js, and PostgreSQL.

As proof of concept, this backend API can be connected to a frontend app at [this repository](https://github.com/Thinkful-Ed/starter-movie-front-end), to show that it is working.

## Technologies Used

### Backend
  - **Node.js:** JavaScript runtime environment used to build the server-side of the application.
  - **Express.js:** Web framework for Node.js used to create the RESTful API routes and handle HTTP requests.
  - **Knex.js:** SQL query builder used for database migrations and writing database queries.
  - **PostgreSQL:** Relational database used to store and manage movies, theaters, critics, and reviews data.
  - **SQLite:** In-memory database used for testing purposes.

### Middleware
  - **cors:** Middleware to enable Cross-Origin Resource Sharing, allowing the frontend to communicate with the backend.
  - **asyncErrorBoundary:** Custom middleware for catching and handling asynchronous errors in the application.

### Testing
  - **Jest:** JavaScript testing framework used to run the tests and ensure correctness.
  - **Supertest:** Library used for testing HTTP endpoints.

### Deployment
  - **Render:** Cloud platform for deploying the backend server.
  - **Dotenv:** Module used to load environment variables from a .env file into process.env.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [API Routes](#api-routes)
- [Database Schema](#database-schema)
- [Middleware](#middleware)
- [Error Handling](#error-handling)
- [Deployment](#deployment)
- [Testing](#testing)
  
## Installation
### Prerequisites
Ensure that you have the following installed on your machine:
  - Node.js (v18 or higher)
  - PostgreSQL
  - Knex CLI
### Steps to Install
1. Clone the repository:

```bash
git clone https://github.com/your-username/WeLoveMovies.git
cd WeLoveMovies
```

2. Install project dependencies:

```bash
npm install
```

3. Set up the environment variables by creating a .env file in the root directory with the following content:

```bash
NODE_ENV=development
PORT=5001
DATABASE_URL=your-postgres-url-here
```

4. Create the database and run migrations:

```bash
npx knex migrate:latest
npx knex seed:run
```

5. Start the server:
   
```bash
npm start
```

## Project Structure

```bash
WeLoveMovies/
├── src/
    ├── critics/
    │   ├── critics.controller.js
    │   ├── critics.router.js
    │   └── critics.service.js
    ├── movies/
    │   ├── movies.controller.js
    │   ├── movies.router.js
    │   └── movies.service.js
    ├── reviews/
    │   ├── reviews.controller.js
    │   ├── reviews.router.js
    │   └── reviews.service.js
    ├── theaters/
    │   ├── theaters.controller.js
    │   ├── theaters.router.js
    │   └── theaters.service.js
    ├── movies_theaters/
    │   ├── movies_theaters.controller.js
    │   ├── movies_theaters.router.js
    │   └── movies_theaters.service.js
    ├── errors/
    ├── utils/
    ├── db/
    │   ├── migrations/
    │   ├── seeds/
    │   └── connection.js
    ├── app.js
    └── server.js
```
  - **app.js:** Main application file where Express, routers, and middlewares are set up.
  - **server.js:** Entry point for starting the application.
  - **db/connection.js:** Database connection using Knex.
  - **src/critics, movies, reviews, theaters:** Contains the controllers, routers, and service files for each resource.
    
## API Routes

### Movies
  - `GET /movies`: List all movies.
  - `GET /movies?is_showing=true`: List all movies currently showing.
  - `GET /movies/:movieId`: Get details for a specific movie.
  - `GET /movies/:movieId/theaters`: Get all theaters where a specific movie is showing.
  - `GET /movies/:movieId/reviews`: Get all reviews for a specific movie.
    
### Theaters
  - `GET /theaters`: List all theaters with the movies they are showing.
  - `GET /theaters/:theaterId`: Get details of a specific theater.
    
### Critics
  - `GET /critics`: List all critics.
  - `GET /critics/:criticId`: Get details of a specific critic.
    
### Reviews
  - `GET /reviews`: List all reviews.
  - `GET /reviews/:reviewId`: Get a specific review.
  - `PUT /reviews/:reviewId`: Update a review.
  - `DELETE /reviews/:reviewId`: Delete a review.

## Database Schema
The database consists of five tables:

  - **movies**
     - `movie_id`: Primary key
     - `title`, `description`, `rating`, `runtime_in_minutes`, `image_url`
      
  - **theaters**
     - `theater_id`: Primary key
     - `name`, `address`
        
  - **reviews**
     - `review_id`: Primary key
     - `content`, `score`, `movie_id`, `critic_id`
        
  - **critics**
     - `critic_id`: Primary key
     - `preferred_name`, `surname`, `organization_name`
        
  - **movies_theaters**
     - Junction table to track which theaters are showing which movies.
     - `movie_id`, `theater_id`, `is_showing`
       
## Middleware
The following middleware is used in this project:
  - **CORS:** Allows cross-origin resource sharing so that the frontend can communicate with the backend.
  - **Error Handlers:**
      - A 404 error handler to catch requests to unknown routes.
      - A general error handler for handling all application errors.
        
## Error Handling
  - **404 Not Found:** Returned if a route does not exist.
  - **405 Method Not Allowed:** Returned if the HTTP method is not allowed for a route.
  - **500 Internal Server Error:** Generic error message when something goes wrong on the server.
    
## Deployment
This application can be deployed to any cloud service, such as Heroku or AWS. You will need to:

1. Set up environment variables in the cloud environment.
2. Ensure the database is available and properly configured.
3. Deploy the application using Git and your cloud provider’s CLI or dashboard.
 
## Testing
To run the tests, use the following command:

```bash
npm test
```
The tests use an in-memory SQLite database. Note that you must query the database again after updates to reflect the changes, as SQLite doesn’t return updated records like PostgreSQL.



    
