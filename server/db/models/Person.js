const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
	favoriteMovies: { type: Array, required: true, default: [] },
	leastFavoriteMovies: { type: Array, required: true, default: [] },
	moviesToConsider: { type: Array, required: true, default: [] },
	genreMovies: { type: Array, required: true, default: [] },
	favoriteShows: { type: Array, required: true, default: [] },
	leastFavoriteShows: { type: Array, required: true, default: [] },
	ShowsToConsider: { type: Array, required: true, default: [] },
	genreShows: { type: Array, required: true, default: [] },
	favoriteSongs: { type: Array, required: true, default: [] },
	leastFavoriteSongs: { type: Array, required: true, default: [] },
	SongsToConsider: { type: Array, required: true, default: [] },
	genreSongs: { type: Array, required: true, default: [] },
	createdAt: { type: Date, default: new Date() },
	updatedAt: { type: Date, default: new Date() }
});

module.exports = mongoose.model('Person', PersonSchema);
