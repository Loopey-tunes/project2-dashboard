const express = require('express');
const router = express.Router();

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
		console.log(error);
		next(error);
	}
});

router.get('/edit/:id', isLoggedIn, async (req, res, next) => {
	try {
		const userID = req.params.id;
		const userInfo = await User.findById(userID);
		res.render('users/edit', { userInfo });
	} catch (error) {
		next(error);
	}
});

router.post('/edit/:id', isLoggedIn, async (req, res, next) => {
	try {
		const {
			'fullName.firstName': firstName,
			'fullName.lastName': lastName,
			username,
			email,
			location,
			department,
			role,
			telephone,
			password,
		} = req.body;

		const userId = req.params.id;
		const userInfo = await User.findByIdAndUpdate(
			userId,
			{
				firstName,
				lastName,
				username,
				email,
				location,
				department,
				role,
				telephone,
				password,
			},
			{ new: true }
		);
		res.redirect('/users/list');
	} catch (error) {
		next(error);
	}
});

module.exports = router;
