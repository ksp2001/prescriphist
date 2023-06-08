const express = require('express');
require('dotenv').config();

const { graphqlHTTP } = require('express-graphql');

const connectDB = require('./config/db');

const port = process.env.PORT || 5000;
const app = express();
const schema = require('./schema/schema');
const cors = require('cors');

connectDB();

app.use(cors());

app.use('/graphql', graphqlHTTP({schema,
graphiql: process.env.NODE_ENV === 'development'}));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});