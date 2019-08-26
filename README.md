# Project Title

A simple API for a tracker-time app

## Prerequisites

* Node JS v10.15
* Mongo 4
* Redis 5.0.3
* Docker (19.03.1)
* Docker Compose (1.17.1). YML file version: 3

All services are deployed using Docker.

## Environment variables

Environment variables are defined on a single file: *app.env*. 

### Getting Started

Locate the *app.env* file in the same path of *docker-compose.yml*. Then execute:

```
docker compose up
```

## Running the tests
Locate in */app* folder. After that, run:

```
npm run test
```

## API documentation
* [Link](https://documenter.getpostman.com/view/2951666/SVfMSqER)
* [API server and DB model](https://docs.google.com/presentation/d/1wp3qNpnMvhuOxfRb6PmXFBFlKto0PsbnqGFgJnhl6mc/edit?usp=sharing)

## Authors

* **Cristian Santos** - *Backend developer* - [GitHub](https://github.com/SantosC95)