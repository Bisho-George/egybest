## Movies API Documentation
 The Movies API is a RESTful API that allows users to perform CRUD (Create, Read, Update, Delete) operations on movies and cast members. The API is built using Node.js and Express.js and uses MongoDB as its database.

## Base URL
 https://movies-api.com


## Endpoints
 Cast Members
 GET /castmembers
 Returns a list of all cast members.

## POST /castmembers

 Adds a new cast member to the database.

GET /castmembers/:id
Returns the cast member with the specified ID.

## Movies
GET /movies
Returns a list of all movies.

POST /movies
Adds a new movie to the database.

GET /movies/:id
Returns the movie with the specified ID.

GET /movies/:id/watch
Increments the watch count for the movie with the specified ID and returns the movie's URL.

POST /movies/rate
Adds a new rating for the movie with the specified ID.

GET /movies/search
Returns a list of movies that match the specified search criteria.

## Query Parameters
## Cast Members
None
Movies
title (optional): Title of the movie to search for. Can be a partial match.
genre (optional): Genre of the movie to search for.
language (optional): Language of the movie to search for.
## Request Body
## Cast Members
POST /castmembers
name (required): Name of the cast member.
movies (required): List of IDs of movies the cast member has appeared in.
role (required): Role of the cast member in the movies.
Movies
POST /movies
title (required): Title of the movie.
members (required): List of IDs of cast members who appeared in the movie.
genre (required): Genre of the movie.
language (required): Language of the movie.
url (required): URL of the movie.