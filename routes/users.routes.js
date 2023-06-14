const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require('../middleware/isLoggedOut');
const isLoggedIn = require('../middleware/isLoggedIn');

// Require the User model in order to interact with the database
const User = require('../models/User.model');

//LIST users
router.get('/list', isLoggedIn, async (req, res, next) => {
	try {
		const userList = await User.find();
		res.render('users/list', { userList });
	} catch (error) {
		console.log(error);
		next(error);
	}
});

//EDIT one user
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
		const userId = req.params.id;

		const {
			'fullName.firstName': firstName,
			'fullName.lastName': lastName,
			username,
			email,
			location,
			department,
			role,
			telephone,
		} = req.body;

		await User.findByIdAndUpdate(
			userId,
			{
				'fullName.firstName': firstName,
				'fullName.lastName': lastName,
				username: username,
				email,
				location,
				department,
				role,
				telephone,
			},
			{ new: true }
		);

		if (req.body.password) {
			let password = req.body.password;

			const salt = await bcrypt.genSalt();
			const hashedPassword = await bcrypt.hash(password, salt);

			await User.findByIdAndUpdate(userId, { password: hashedPassword });
		}

		res.redirect('/users/list');
	} catch (error) {
		next(error);
	}
});

router.get('/delete/:id', isLoggedIn, async (req, res, next) => {
	try {
		const userId = req.params.id;
		await User.findByIdAndDelete(userId);
		res.redirect('/users/list');
	} catch (error) {
		console.log(error);
		next(error);
	}
});

module.exports = router;
