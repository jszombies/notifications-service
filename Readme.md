# Notification service API

## Running service as docker container
1. Download and install Docker from `https://www.docker.com/get-started`.
2. Build and run service using following command: `docker-compose up -d --build`
3. Use API hosted on `http://localhost:3000/api/v1`

## Running service as a regular node.js application
1. Download and install MongoDB server from `https://www.mongodb.com/download-center/community`
2. Run MongoDB server
3. Download and install yarn from `https://yarnpkg.com/`
4. Install package `cross-env` globally using the following command `yarn global add cross-env`
5. Prepare link to connect to your MongoDB server: `mongodb://db_username:db_password@db_host:db_port/db_name`
(Replace `db_username`, `db_password`, `db_host`, `db_port` and `db_name` to your values.)
6. Run service using the following command: `cross-env MONGO_URL=link_from_previous_step yarn start`
7. Use API hosted on `http://localhost:3000/api/v1`

## Mock data generation
To generate mock data you need to set up some environment variables before applications start:
* `APPLY_FIXTURES: "true"` - to enable mock data generation (`10` notifications by default)
* `FIXTURES_COUNT: 20` - to generate exact amount of data

You can set these variables in docker-compose.yml:18 if you are running the service as a docker container.
Or you can set these variables using `cross-env` if you are running the service as a node.js app:

`cross-env MONGO_URL=... APPLY_FIXTURES="true" FIXTURES_COUNT=20 yarn start`

## API Documentation
Swagger documentation for service API is located [here](swagger/Notifications.yaml).

