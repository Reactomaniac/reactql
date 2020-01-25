const express = require("express");
const bodyParser = require("body-parser");

const graphqlHttp = require("express-graphql");

const mongoose = require("mongoose");

const graphQlSchema = require("./graphql/schema/index");
const graphqlResolvers = require("./graphql/resolvers/index");

const app = express();

app.use(bodyParser.json());


app.use("/graphql", graphqlHttp({
  schema: graphQlSchema,
  rootValue: graphqlResolvers,
  graphiql: true
})
);

mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ds211709.mlab.com:11709/events`)
  .then( () => {
    app.listen(3000);
  }).catch(err => {
  console.log(err);
})
