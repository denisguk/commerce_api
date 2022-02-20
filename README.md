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

*Global Link*
```
https://ecommerce-api-nodejs.herokuapp.com
```

## How to use extra params in endpoints
Right now API support next extra params that can be passed in URL (available only for List endpoints):
```js
let {
    query,
    relations,
    order,
    skip = 0,
    take = 50,
} = req.query
```

Example include variants and take only 1 item. 
```js
// Example
const url = 'https://ecommerce-api-nodejs.herokuapp.com/api/product?relations=variants&take=1'
```

For filtering list of items are you can use `query=<JSON>` param. For example
to filter items by name
```js
const url = 'https://ecommerce-api-nodejs.herokuapp.com/api/product?query={"name":"Chair"}';
```


For `api/<entity>/<id>` available only `relations` property

Example
```js
const url = 'https://ecommerce-api-nodejs.herokuapp.com/api/product/4?relations[]=variants'
```


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
