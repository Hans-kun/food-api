# API

![MIT License][license-shield]

# Food Court Addons API

## Description

To run this application in development mode clone this repo to your local machine and open up in a code editor

## Installation dependencies

```bash
$ npm i
```

## Setup database

download the latest version of postgres, open up the pgAdmin 4 and create a database remember to get all database credentials and run migrations:

```bash
$ npm run migrate
```

if you encounter and error while doing this then you would have to install knex globaly on your local machine to do this run :

```bash
$ npm install knex -g
```

this gives us access to the knex cli. Now run

```bash
$ knex migrate:latest
```

## Seed the database

```bash
$ npm run seed
```

this is for the knex cli. Now run

```bash
knex seed:run
```

or

```bash
knex seed:run --specific=seed-filename.js
```

to run files independently

## Setup environment

rename the .env.example file to .env and fill it up with the required parameters

## Running the app

```bash
# watch mode
$ npm run start:dev
```

### Format codes

To format your codes, run:

```bash
$ npm run format
```
