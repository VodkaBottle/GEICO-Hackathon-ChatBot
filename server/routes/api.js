const express = require('express');
const router = express.Router();
const Person = require('../db/models/Person');

router.get('/fav-movies', (req, res, next) => {
	Person.find((err, person) => {
		if (err) {
			console.log(err);
		} else {
			res.json(person);
		}
	});
});

let model = {
	favMovies: [{}],
	leastFavMovies: [{}],
	moviesConsider: [{}],
	movieGenre: [{}]
};

router.get('/favmovies', (req, res, next) => {
	res.json(model.favMovies);
});

router.get('/leastfavmovies', (req, res, next) => {
	res.json(model.leastFavMovies);
});

router.get('/moviesconsider', (req, res, next) => {
	res.json(model.moviesConsider);
});

router.get('/moviesgenre', (req, res, next) => {
	res.json(model.movieGenre);
});

router.post('/favmovies', (req, res, next) => {
	model.favMovies = model.favMovies.concat(req.body);
	res.json(model.favMovies);
});

router.post('/leastfavmovies', (req, res, next) => {
	model.leastFavMovies = model.leastFavMovies.concat(req.body);
	res.json(model.leastFavMovies);
});

router.post('/moviesconsider', (req, res, next) => {
	model.moviesConsider = model.moviesConsider.concat(req.body);
	res.json(model.moviesConsider);
});

router.post('/moviesgenre', (req, res, next) => {
	model.movieGenre = model.movieGenre.concat(req.body);
	res.json(model.movieGenre);
});
module.exports = router;
