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

4. Add `JWT_SECRET_KEY` in your Heroku config vars

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

### Running migrations on Heroku

1. [package.json](https://github.com/sabrina-tw/sequelize-jwt-pokemon/blob/main/package.json#L27)

```js
    "heroku-postbuild": "PGSSLMODE=no-verify npx sequelize-cli db:migrate --url $DATABASE_URL --env production"
```

DB migration will fail without `PGSSLMODE=no-verify`. See: https://github.com/sequelize/sequelize/issues/956#issuecomment-790798772

In production, you will need to acquire an SSL certificate to enable SSL verification, for security: https://devcenter.heroku.com/articles/acquiring-an-ssl-certificate

What is Postgres SSLMODE?: https://ankane.org/postgres-sslmode-explained

# Sequelize

### Adding associations

Generate new migration file

```
npx sequelize migration:generate --name add-trainerid-on-pokemon
```

Add columns if necessary, and define the associations in the model files. See: https://github.com/sabrina-tw/sequelize-jwt-pokemon/commit/eb871f2167cca519c5fe77873b4818d4fc30ea7d (example for adding association to Pokemon/Trainer)

# Deploying with frontend

We can deploy our application with React in 1 single Heroku app (the alternative is to deploy our backend to Heroku, and frontend to Netlify), but we will need to set some things up.

In the root folder, create your React app:

```
npx create-react-app client
```

For further steps, see: https://github.com/sabrina-tw/sequelize-jwt-pokemon/commit/231c31a1be261dfcddda6016cd8ba0b2273a4932 (with comments)

# TODO

- [x] deploy to Heroku with connection to db (Heroku Postgres)
  - https://sequelize-jwt-pokemon.herokuapp.com/trainers (this should retrieve an array of Trainers)
- [x] add script to run db migrations on production with sequelize-cli
- [x] add association between Trainer and Pokemon models
  - includes creating a fresh migration file (Pokemon will need `trainerId`)
- [x] add simple frontend with React and re-deploy
- [ ] implement seed file to seed Pokemon data
