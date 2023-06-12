const express = require('express');
const isLoggedIn = require('../middleware/isLoggedIn');
const router = express.Router();

/* GET home page */
router.get('/', isLoggedIn, (req, res, next) => {
	try {
		res.render('index');
	} catch (error) {
		next(error);
	}
});

module.exports = router;
