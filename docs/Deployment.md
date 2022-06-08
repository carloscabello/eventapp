# Eventapp

## Deployment

### Docker Compose

### Manually

#### 1. Database

Non persistent MariaDB container:

```shell
docker run --detach --name eventapp_db \
    -p 3306:3306 \
    -e ALLOW_EMPTY_PASSWORD=yes \
    -e MARIADB_USER=eventapp_user \
    -e MARIADB_PASSWORD=eventapp_user \
    -e MARIADB_DATABASE=eventapp \
  bitnami/mariadb:10.7
```

Persistent MariaDB container:

```shell
docker run --detach --name eventapp_db \
    -p 3306:3306 \
    -v .mariadb_data:/bitnami/mariadb \ 
    -e MARIADB_ROOT_PASSWORD=yHJX5Y3vDhpi5F \
    -e MARIADB_USER=eventapp_user \
    -e MARIADB_PASSWORD=eventapp_user \
    -e MARIADB_DATABASE=eventapp \
  bitnami/mariadb:10.7
```

*NOTE: As this is a non-root container, the mounted files and directories must have the proper permissions for the UID 1001.*

```shell
sudo chown -R 1001 mariadb_data
```

#### 2. Backend

```shell
cd ./backend
npm install
cp .env.example .env
npm start
```

The default `.env.example` has the following values:

```
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USERNAME=eventapp_user
DATABASE_PASSWORD=eventapp_user
DATABASE_NAME=eventapp
APP_PORT=3000
EVENTBRITE_API_KEY=eventbrite_api_private_token
```

We need to provide our own `eventbrite_api_private_token` that we can obtain with an [Eventbrite](https://www.eventbrite.com/platform/api#/introduction) account.

We need to execute the migrations to create the database schema and seeders to fill it with some data.

```shell
npx sequelize-cli db:migrate:undo:all # Optional: Restores database

npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```