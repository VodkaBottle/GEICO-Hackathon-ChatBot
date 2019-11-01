var express = require('express');
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

module.exports = router;
