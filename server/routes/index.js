var express = require('express');
const movieFuncs = require('./TheMovieDB');
var router = express.Router();

/* GET home page. */

// Chat
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.post('/', (req, res, next) => {
	const message = req.body;
	console.log(message);
	res.end();
});
 
router.post('/favorite-movies', (req, res, next) => {
	console.log("Hello");
	const {message} = req.body;
	let response =  movieFuncs.getMoviesByKeyword(message)
	.then(resp => res.json(resp))
});


module.exports = router;
