const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');

const schema = require('./server/schema/schema');
const testSchema = require('./server/schema/types_schema')

const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 4000

// mongodb+srv://naseem:<password>@graphqlcluster.ihdog.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
app.use(cors());
app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema: schema

}))

mongoose.connect(`mongodb+srv://${process.env.mongoUserName}:${process.env.mongoUserPassword}@graphqlcluster.ihdog.mongodb.net/${process.env.mongoDatabase}?retryWrites=true&w=majority`,
  {useNewUrlParser: true, useUnifiedTopology: true}
).then(() => {
  app.listen({port: port}, () => {
    console.log('Listening for request on port ' + port);
  })
}).catch((e) => console.log("ERROR:::" + e));
