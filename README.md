# Recruitr API

## Summary
The Recruitr API was design to store information regarding prospects for college sports recruiters.
Users are able to store contact information, player's stats as well as their school information. 

### Technologies
This API Utilizes React, Node.js, PostgreSQL, and Express.

### Endpoints
'/player': 
Used for GET and POST methods allowing you to view all the players in the database and create new players.

'/player/:id':
Used for GET, PATCH and DELETE methods allowing you to view the information on a specified player,
edit that information and delete the player.

'/school':
Used for GET method allowing you to view all the schools in the database.

'/school/add':
Used for POST method allowing you to create a new school in the database.

'/school/:id':
Used for DELETE method allowing you to remove a school and the corresponding players for the school from the database.
