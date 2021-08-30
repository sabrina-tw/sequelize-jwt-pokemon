# Heroku deployment

https://sequelize-jwt-pokemon.herokuapp.com

## Troubleshooting

If connection to the database fails for whatever reason, check that these are in place as they may be the potential missing piece:

- https://github.com/sabrina-tw/sequelize-pokemon/blob/242187a27735a7b7805ad8f005e2ebc2819349b9/models/index.js#L13
- add dialectOptions: https://github.com/sabrina-tw/sequelize-pokemon/blob/main/config/config.js#L26-L31 (see: https://stackoverflow.com/questions/61350186/how-to-solve-the-database-connection-error-sequelizeconnectionerror)
- https://github.com/sabrina-tw/sequelize-pokemon/blob/main/config/config.js#L19 (DATABASE_URL is used for Heroku Postgres)

# TODO

- [x] deploy to Heroku with connection to db (Heroku Postgres)
  - https://sequelize-jwt-pokemon.herokuapp.com/trainers (this should retrieve an array of Trainers)
- [ ] add script to run db migrations on production with sequelize-cli
- [ ] add association between Trainer and Pokemon models
  - includes creating a fresh migration file (Pokemon will need `trainerId`)
- [ ] add simple frontend with React and re-deploy
  - requires cors configuration
