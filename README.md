# Technical Test Project - Habit-test

This repository contains the source code for a project developed as part of the technical test for the company Habit-test. The project was built using Node.js, Nest.js, and TypeORM, providing an efficient and scalable solution for the proposed challenges.

## Challenge Description

Build a RESTful JSON API using Python3/Flask or Node/Express to manage multiple applications and perform operations in 2 different levels of client hierarchy (admin, user).

#### Operations:

###### An admin can:
- Users: Create, Read, and Delete
- Applications: Create and Read
- Messages: Delete

###### An user can:
- Users (same application): Read (profile fields)
- Users (itself): Delete
- Messages: Post to each other user within the same application

#### Constraints:
- Each endpoint must be authenticated by the user (in the application context) or admin (in the general context)
- Each application is a new context, so one user will not see other user information or messages, only their own
- Each user belongs to one application; one application user should not be able to see other application’s users.

## Technologies Used

- Node.js
- Nest.js
- TypeORM

## API Documentation

The API documentation is available via Swagger and can be accessed at the following address: [https://localhost:3000/api_doc](https://localhost:3000/api_doc).

## Postman Documentation

The API documentation and basic API test are available via Postman and can be accessed [here](https://api.postman.com/collections/2882740-a4992b7c-4601-4ded-a55d-341a375d9c4e?access_key=PMAT-01HQ0DPX0NJSRX1A51ACG34EVA) or by file **habit-test.postman_collection** in the root project folder.

## API Authentication

All passwords are sent to the backend in encrypted form to prevent the request from being intercepted. For testing, you can use the website [devtoolcafe.com](https://devtoolcafe.com/tools/aes) with the settings below to obtain an encrypted password:

**Mode:** CBC

**Padding:** Pkcs7

**Key:** hjhoidw7on5b89ag

## Dockerization

The project is dockerized to facilitate execution in different environments. Use the following commands to build the Docker image and run the container:

```bash
# Build the Docker image
npm run docker:build

# Run the Docker container
npm run docker:run
