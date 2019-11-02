const mongoose = require('mongoose');

const FavMoviesSchema = new mongoose.Schema({
	favoriteMovies: [Number]
});

module.exports = mongoose.model('FavMovies', FavMoviesSchema);
