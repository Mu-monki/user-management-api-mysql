# README #

User Management API

### What is this repository for? ###

* Quick summary
> This is a very simple User Management API based on NodeJS and MySQL. This implements stateless authentication via the use of JWT tokens.
* Version
> 1.0

### How do I get set up? ###
* Clone the repository from the following links:
> https://github.com/Mu-monki/user-management-api-mysql.git
> https://Mu-Monki@bitbucket.org/Mu-Monki/mern-rest.git
* Install dependencies with the `npm install` command on the root of the project folder.
* Create a .ENV file on the root directory
> The environment variables must be named the following
```
    NODE_ENV = 
    PORT = 
    MYSQL_DB_HOST = 
    MYSQL_DB_USER = 
    MYSQL_DB_PASSWORD = 
    MYSQL_DB_NAME = 
    JWT_SECRET = 
```
* Run the backend with the `npm run server` command on the root of the project folder.

### Database Setup & Seeding ###

* Create your MySQL database
* Connect your database by placing the correct variables on the .ENV file
```
    MYSQL_DB_HOST = 
    MYSQL_DB_USER = 
    MYSQL_DB_PASSWORD = 
    MYSQL_DB_NAME = 
```
* Run the `npm run db-init` command on the root of the project folder to create the table(s) required for the project.
* (Optional) Run the `npm run db-seed` command on the root of the project folder to seed the database with mock data. This command may also take an `iterations` argument on the command to be able to set how many records you want seeded on the DB e.g. `npm run db-seed --iterations=55` will insert 55 records on the database. (Note: the default number of iterations has been set to 10 records).
