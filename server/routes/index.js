var express = require('express');
var router = express.Router();
const processMessage = require('../process-message');

/* GET home page. */

// Chat
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.post('/', (req, res, next) => {
	const message = req.body;
	// console.log(message);
	processMessage(message);
	res.end();
});

module.exports = router;
