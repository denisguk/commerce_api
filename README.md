# eCommerce API

## About
eCommerce API - it's a nude backend part for generate API and preset of data for eCommerce apps. 

This is a project allowing to generate API for a demo or learning purposes. Project
uses ExpressJS, TypeORM and MYSQL database.

## Prerequisites
For run this app you have to install, Node >=14.0*, Mysql 8.0*,


## Installation

1. First copy and rename `config.example.js` to `config.js` and then setup
params for database connection.

2.For local development please run these commands:
```
npm install
npm start:dev
```
3. Observe result

## Deployment
Deployment right now work with Hekokuapp. The project connected to GitHub
and it's possible to run deployments via UI of Heroku service.


## Run fixtures
Fixtures - it's automatically generated data for demonstration or testing purposes. To insert
this data to database please run command (DEV env):
```
npm run fixtures:dev 
```

Run fixtures for production
```
npm run fixtures:prod
```

## Troubleshooting
No cases were found by this time
