const info = require('../keys/mongo');
const mongoose = require('mongoose');

module.exports = () => {
	mongoose
		.connect(info.uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		.catch(err => console.log(err));

	mongoose.connection.on('connected', () => {
		console.log('Mongoose is connected');
	});

	mongoose.connection.on('error', error => {
		console.error(`Mongoose could not connect ${error}`);
	});

	mongoose.connection.on('disconnected', () => {
		console.log('Mongoose is disconnected');
	});
};
