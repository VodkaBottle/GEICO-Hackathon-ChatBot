const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Person = require('../db/models/Person');
const fetch = require('node-fetch');
const movie = require('../keys/movie');

const getMovieInfo = movie => {
	fetch(
		`https://api.themoviedb.org/3/search/movie?api_key=${movie.key}&language=en-US&query=${movie}&page=1&include_adult=false`
	)
		.then(resp => resp.json())
		.then(data => {
			const mov = data.results;
			return mov;
		})
		.catch(err => console.log(err));
};

module.exports = getMovieInfo;
