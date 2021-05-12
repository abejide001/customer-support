# Customer Support

[![CircleCI](https://circleci.com/gh/abejide001/customer-support.svg?style=svg)](https://app.circleci.com/pipelines/github/abejide001/customer-support/54a914c3-105e-4010-bbb6-281cfcfb8451)

Customer support API

## Introduction

Welcome to version 1 of Customer Support API. Below you will find a current list of available methods on different endpoints.

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

To work with this project you need to have the following installed on your local machine

1. [NodeJS](https://nodejs.org)
2. [Git](https://git-scm.com/downloads)
3. [MongoDB](https://docs.mongodb.com/manual/installation/) For local development vanilla mongodb without authentication is expected and it should be listening on localhost:27017
4. [Postman](https://www.postman.com/downloads/)

## Install and run locally

```bash
git clone https://github.com/abejide001/customer-support.git
cd customer-support

export
MONGOMS_DOWNLOAD_URL=http://downloads.mongodb.org/linux/mongodb-linux-x86_64-debian10-latest.tgz
mv .env.sample .env
npm i
NODE_ENV=development npm run seed:dev # seeds dev database
NODE_ENV=development npm run start:dev # dev environment
```

## Running Tests

```bash
git clone https://github.com/abejide001/customer-support.git
cd customer-support

# rename .env.sample to .env, and set your environment variables -- no username&password for local database

export
MONGOMS_DOWNLOAD_URL=http://downloads.mongodb.org/linux/mongodb-linux-x86_64-debian10-latest.tgz
mv .env.sample .env
npm i
npm run test
```

## API Usage

API BASE URL(<https://customer-support-2021.herokuapp.com/api/v1>). It's recommended to attach a `Authorization` Header containing the generated `token` from `/api/v1/auth/signin` to access requests.

### Tickets endpoints `/tickets`

| method | route              | description                        | data            | priviledge |
|--------|--------------------|------------------------------------|-----------------|------------|
| GET    | /                  | Get all tickets                    |                 | customer   |
| GET    | /:month            | Get tickets for the previous month |                 | agent      |
| POST   | /                  | Create a ticket                    | `{description}` | customer   |
| GET    | /process           | Get ticket to process              |                 | agent      |
| PATCH  | /process/:ticketId | Process a ticket                   | `{state}`       | agent      |

### Comment endpoint `/comments`

| method | route      | description      | data        | priviledge      |
|--------|------------|------------------|-------------|-----------------|
| POST   | /:ticketId | Create a comment | `{comment}` | agent, customer |

### Authentication endpoints `/auth`

| method | route   | description | data                | priviledge             |
|--------|---------|-------------|---------------------|------------------------|
| POST   | /sigin  | Sign In     | `{email, password}` | admin, agent, customer |
| POST   | /signup | Sign up     | `{email, password}` | admin, agent, customer |

### User endpoints `/users`

| method | route | description   | priviledge |
|--------|-------|---------------|------------|
| GET    | /     | Get all users | admin      |
| PATCH  | /:id  | Edit a user   | admin      |

```javascript
// login as admin
{
  email: "abejide@gmail.com",
  password: "abcdef"
}
// login as customer
{
  email: "femi@gmail.com",
  password: "abcdef"
}
// login as agent
{
  email: "ade@gmail.com",
  password: "abcdef"
}
```

## API Docs

<https://customer-support-2021.herokuapp.com/api/v1/docs> (change the Schemes to HTTPS)

## App URL

<https://customer-support-2021.herokuapp.com/api/v1>

## Improvement

- Customers should be able to comment after they created a ticket, incase they figured out the solution to the problem after raising the support ticket, and they don't need further assistance.
- A customer should be able to report an agent if a ticket was handled misappropiately

## Challenges faced

The report for the previous month is always generated when a call is made to the endpoint to get the report, I initially tried to upload the report to cloudinary but that caused duplication of different reports on clouinary, download as pdf option can be implemented on the frontend.

## Author

Abejide Femi - abejidefemi1@gmail.com
