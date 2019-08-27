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

Environment variables are defined on two **.env** files:
* Run server: *app.env*.
* Run server in test mode: *test.env*

### Execute the API server

Locate the *app.env* file in the same path of *docker-compose.yml*. Then execute:

```
docker compose up
```

## Running the tests
- Install all dependencies locally: **npm install**.
- Have instances of Mongo and Redis running locally. Recommendation: modify *docker-compose.yml* to run just mongodb and redis (comment the *time-tracker* service)
- Use the *test.env* file. Locate the file at the root folder (same level as *docker-compose.yml*). Then, execute the following command inside the **app** folder:

```
npm run run:test
```

- The last step will run a version of the server for test purposes.
- After this, run:

```
npm run test
```

- The last part should run the test suites.


## API documentation
* [Link](https://documenter.getpostman.com/view/2951666/SVfMSqER)
* [API server and DB model](https://docs.google.com/presentation/d/1wp3qNpnMvhuOxfRb6PmXFBFlKto0PsbnqGFgJnhl6mc/edit?usp=sharing)


## Authors

* **Cristian Santos** - *Backend developer* - [GitHub](https://github.com/SantosC95)