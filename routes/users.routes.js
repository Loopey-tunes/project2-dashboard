const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require('../middleware/isLoggedOut');
const isLoggedIn = require('../middleware/isLoggedIn');

// Require the User model in order to interact with the database
const User = require('../models/User.model');

router.get('/list', isLoggedIn, async (req, res, next) => {
	try {
		const userList = await User.find();
		console.log('list of users:', { userList });
		res.render('users/list', { userList });
	} catch (error) {
		res.send(error);
	}
});

module.exports = router;
