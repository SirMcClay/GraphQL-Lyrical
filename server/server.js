const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');
const MONGO_STRING = require('../mongo-string');

const app = express();

// Replace with your mongoLab URI
const MONGO_URI = MONGO_STRING;
if (!MONGO_URI) {
	throw new Error('You must provide a MongoLab URI');
}

const mongoConnectOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, mongoConnectOptions);
mongoose.connection
	.once('open', () => console.log('Connected to MongoLab instance.'))
	.on('error', (error) => console.log('Error connecting to MongoLab:', error));

app.use(bodyParser.json());
app.use(
	'/graphql',
	expressGraphQL({
		schema,
		graphiql: true,
	})
);

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
