# Heroku deployment

https://sequelize-jwt-pokemon.herokuapp.com

1. specify node version in package.json

```js
  "engines": {
    "node": "14.x"
  },
```

2. Connect GitHub repo to your Heroku app

3. Add Heroku Postgres add-on (free hobby tier)

Check in your Heroku config vars, `DATABASE_URL` should have been created by Heroku Postgres.

### Connection to Heroku Postgres database

If connection to the database fails for whatever reason, check that these are in place as they may be the potential missing piece:

1. `process.env[config.use_env_variable]` -> `config.use_env_variable`
   https://github.com/sabrina-tw/sequelize-jwt-pokemon/blob/main/db/models/index.js#L13

2. [config/database.js](https://github.com/sabrina-tw/sequelize-jwt-pokemon/blob/main/config/database.js#L24-L29)

```js
  production: {
    use_env_variable: `${process.env.DATABASE_URL}?sslmode=require`,
    ...
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
```

See [stackoverflow](https://stackoverflow.com/questions/61350186/how-to-solve-the-database-connection-error-sequelizeconnectionerror)

### Running migrations on production

1. [package.json](https://github.com/sabrina-tw/sequelize-jwt-pokemon/blob/main/package.json#L27)

```js
    "heroku-postbuild": "PGSSLMODE=no-verify npx sequelize-cli db:migrate --url $DATABASE_URL --env production"
```

DB migration will fail without `PGSSLMODE=no-verify`. See: https://github.com/sequelize/sequelize/issues/956#issuecomment-790798772

# TODO

- [x] deploy to Heroku with connection to db (Heroku Postgres)
  - https://sequelize-jwt-pokemon.herokuapp.com/trainers (this should retrieve an array of Trainers)
- [x] add script to run db migrations on production with sequelize-cli
- [x] add association between Trainer and Pokemon models
  - includes creating a fresh migration file (Pokemon will need `trainerId`)
- [ ] add simple frontend with React and re-deploy
  - requires cors configuration
