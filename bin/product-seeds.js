const mongoose = require('mongoose');
const Product = require('../models/Product.model');
require("dotenv").config();
const productData = [
	{
		name: 'Product 1',
		ref: '0001',
		stock: 10,

		location: {
			row: '1',
			lane: '1',
			shelf: '1',
		},
		category: 'Category 1',
		keywords: ['keyword1', 'keyword2'],
		manufacturer: 'Manufacturer A',
	},
	{
		name: 'Product 2',
		ref: '0002',
		stock: 20,
		location: {
			row: '2',
			lane: '2',
			shelf: '2',
		},
		category: 'Category 2',
		keywords: ['keyword3', 'keyword4'],
		manufacturer: 'manufacturer B',
	},
	{
		name: 'Product 3',
		ref: '0003',
		stock: 30,
		location: {
			row: '3',
			lane: '3',
			shelf: '3',
		},
		category: 'Category 3',
		keywords: ['keyword5', 'keyword6'],
		manufacturer: 'manufacturer C',
	},
	{
		name: 'Product 4',
		ref: '0004',
		stock: 40,
		location: {
			row: '4',
			lane: '4',
			shelf: '4',
		},
		category: 'Category 4',
		keywords: ['keyword7', 'keyword8'],
		manufacturer: 'manufacturer D',
	},
	{
		name: 'Product 5',
		ref: '0005',
		stock: 50,
		location: {
			row: '5',
			lane: '5',
			shelf: '5',
		},
		category: 'Category 5',
		keywords: ['keyword9', 'keyword10'],
		manufacturer: 'manufacturer E',
	},
	{
		name: 'Product 6',
		ref: '0006',
		stock: 60,
		location: {
			row: '6',
			lane: '6',
			shelf: '6',
		},
		category: 'Category 6',
		keywords: ['keyword11', 'keyword12'],
		manufacturer: 'manufacturer F',
	},
	{
		name: 'Product 7',
		ref: '0007',
		stock: 70,
		location: {
			row: '7',
			lane: '7',
			shelf: '7',
		},
		category: 'Category 7',
		keywords: ['keyword13', 'keyword14'],
		manufacturer: 'manufacturer G',
	},
	{
		name: 'Product 8',
		ref: '0008',
		stock: 80,
		location: {
			row: '8',
			lane: '8',
			shelf: '8',
		},
		category: 'Category 8',
		keywords: ['keyword15', 'keyword16'],
		manufacturer: 'manufacturer H',
	},
	{
		name: 'Product 9',
		ref: '0009',
		stock: 90,
		location: {
			row: '9',
			lane: '9',
			shelf: '9',
		},
		category: 'Category 9',
		keywords: ['keyword17', 'keyword18'],
		manufacturer: 'manufacturer I',
	},
	{
		name: 'Product 10',
		ref: '0010',
		stock: 100,
		location: {
			row: '10',
			lane: '10',
			shelf: '10',
		},
		category: 'Category 10',
		keywords: ['keyword19', 'keyword20'],
		manufacturer: 'manufacturer J',
	},
];

async function seedData() {
	try {
		/* CONNECT */
		const MONGO_URI =
			process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/project2-dashboard';
		const conn = await mongoose.connect(MONGO_URI);
		console.log(
			`Connected to Mongo! Database name: "${conn.connections[0].name}"`
		);

		/* DELETE EXISTING DATA */
		//WARNING: this will delete all products in your DB !!
		await Product.deleteMany({});

		/* SEED PRODUCTDATA */
		const productsFromDB = await Product.insertMany(productData);
		console.log(`Number of product created... ${productsFromDB.length} `);

		/* CLOSE DB CONNECTION */
		mongoose.connection.close();
	} catch (e) {
		console.log('error seeding data in DB....', e);
	}
}

seedData();
