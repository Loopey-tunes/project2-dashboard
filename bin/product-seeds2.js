const mongoose = require('mongoose');
const Product = require('../models/Product.model');

const productData = [
	{
		name: 'Samsung Galaxy S21',
		ref: '0002',
		stock: 15,
		location: {
			row: '2',
			lane: '2',
			shelf: '2',
		},
		category: 'Electronics',
		keywords: ['smartphone', 'Samsung', 'Android'],
		manufacturer: 'Samsung',
	},
	{
		name: 'Nike Air Max 290',
		ref: '0104',
		stock: 20,
		location: {
			row: '4',
			lane: '4',
			shelf: '4',
		},
		category: 'Footwear',
		keywords: ['shoes', 'sneakers', 'Nike'],
		manufacturer: 'Nike',
	},

	{
		name: 'iPhone 13 Pro',
		ref: '0001',
		stock: 10,
		location: {
			row: '1',
			lane: '1',
			shelf: '1',
		},
		category: 'Electronics',
		keywords: ['smartphone', 'Apple', 'iOS'],
		manufacturer: 'Apple',
	},
	{
		name: 'Sony PlayStation 5',
		ref: '0003',
		stock: 5,
		location: {
			row: '3',
			lane: '3',
			shelf: '3',
		},
		category: 'Gaming',
		keywords: ['console', 'gaming', 'Sony'],
		manufacturer: 'Sony',
	},
	{
		name: 'Nike Air Max 270',
		ref: '0004',
		stock: 20,
		location: {
			row: '4',
			lane: '4',
			shelf: '4',
		},
		category: 'Footwear',
		keywords: ['shoes', 'sneakers', 'Nike'],
		manufacturer: 'Nike',
	},
	{
		name: 'Canon EOS R5',
		ref: '0005',
		stock: 8,
		location: {
			row: '5',
			lane: '5',
			shelf: '5',
		},
		category: 'Cameras',
		keywords: ['photography', 'camera', 'Canon'],
		manufacturer: 'Canon',
	},
	{
		name: 'Dell XPS 15',
		ref: '0006',
		stock: 12,
		location: {
			row: '6',
			lane: '6',
			shelf: '6',
		},
		category: 'Computers',
		keywords: ['laptop', 'Dell', 'Windows'],
		manufacturer: 'Dell',
	},
	{
		name: 'Adidas Ultraboost',
		ref: '0007',
		stock: 18,
		location: {
			row: '7',
			lane: '7',
			shelf: '7',
		},
		category: 'Footwear',
		keywords: ['running shoes', 'sneakers', 'Adidas'],
		manufacturer: 'Adidas',
	},
	{
		name: 'Amazon Echo Dot',
		ref: '0008',
		stock: 10,
		location: {
			row: '8',
			lane: '8',
			shelf: '8',
		},
		category: 'Smart Home',
		keywords: ['smart speaker', 'Amazon', 'Alexa'],
		manufacturer: 'Amazon',
	},
	{
		name: 'GoPro HERO9 Black',
		ref: '0009',
		stock: 7,
		location: {
			row: '9',
			lane: '9',
			shelf: '9',
		},
		category: 'Cameras',
		keywords: ['action camera', 'GoPro', 'adventure'],
		manufacturer: 'GoPro',
	},
	{
		name: 'Tesla Model 3',
		ref: '0010',
		stock: 3,
		location: {
			row: '10',
			lane: '10',
			shelf: '10',
		},
		category: 'Automotive',
		keywords: ['electric car', 'Tesla', 'sustainable'],
		manufacturer: 'Tesla',
	},
	{
		name: 'Microsoft Surface Pro 7',
		ref: '0011',
		stock: 9,
		location: {
			row: '11',
			lane: '11',
			shelf: '11',
		},
		category: 'Computers',
		keywords: ['tablet', 'Microsoft', 'Windows'],
		manufacturer: 'Microsoft',
	},
	{
		name: 'Rolex Submariner',
		ref: '0012',
		stock: 2,
		location: {
			row: '12',
			lane: '12',
			shelf: '12',
		},
		category: 'Watches',
		keywords: ['luxury', 'timepiece', 'Rolex'],
		manufacturer: 'Rolex',
	},
	{
		name: 'Canon EF 50mm f/1.8 STM Lens',
		ref: '0013',
		stock: 6,
		location: {
			row: '13',
			lane: '13',
			shelf: '13',
		},
		category: 'Photography',
		keywords: ['camera lens', 'Canon', 'portrait'],
		manufacturer: 'Canon',
	},
	{
		name: 'Lenovo ThinkPad X1 Carbon',
		ref: '0014',
		stock: 10,
		location: {
			row: '14',
			lane: '14',
			shelf: '14',
		},
		category: 'Computers',
		keywords: ['laptop', 'Lenovo', 'business'],
		manufacturer: 'Lenovo',
	},
	{
		name: 'Gucci GG Marmont Matelassé Shoulder Bag',
		ref: '0015',
		stock: 4,
		location: {
			row: '15',
			lane: '15',
			shelf: '15',
		},
		category: 'Fashion',
		keywords: ['handbag', 'luxury', 'Gucci'],
		manufacturer: 'Gucci',
	},
	{
		name: 'Bose QuietComfort 35 II',
		ref: '0016',
		stock: 10,
		location: {
			row: '16',
			lane: '16',
			shelf: '16',
		},
		category: 'Audio',
		keywords: ['headphones', 'Bose', 'noise-canceling'],
		manufacturer: 'Bose',
	},
	{
		name: 'LG OLED CX Series 4K TV',
		ref: '0017',
		stock: 5,
		location: {
			row: '17',
			lane: '17',
			shelf: '17',
		},
		category: 'Electronics',
		keywords: ['television', 'LG', 'smart TV'],
		manufacturer: 'LG',
	},
	{
		name: 'Hermès Birkin',
		ref: '0018',
		stock: 1,
		location: {
			row: '18',
			lane: '18',
			shelf: '18',
		},
		category: 'Fashion',
		keywords: ['handbag', 'luxury', 'Hermès'],
		manufacturer: 'Hermès',
	},
	{
		name: 'Xbox Series X',
		ref: '0019',
		stock: 3,
		location: {
			row: '19',
			lane: '19',
			shelf: '19',
		},
		category: 'Gaming',
		keywords: ['console', 'gaming', 'Microsoft'],
		manufacturer: 'Microsoft',
	},
	{
		name: 'Canon EOS 5D Mark IV',
		ref: '0020',
		stock: 8,
		location: {
			row: '20',
			lane: '20',
			shelf: '20',
		},
		category: 'Cameras',
		keywords: ['photography', 'camera', 'Canon'],
		manufacturer: 'Canon',
	},
	{
		name: 'Sony WH-1000XM4',
		ref: '0021',
		stock: 6,
		location: {
			row: '21',
			lane: '21',
			shelf: '21',
		},
		category: 'Audio',
		keywords: ['headphones', 'Sony', 'noise-canceling'],
		manufacturer: 'Sony',
	},
	{
		name: 'Louis Vuitton Neverfull',
		ref: '0022',
		stock: 2,
		location: {
			row: '22',
			lane: '22',
			shelf: '22',
		},
		category: 'Fashion',
		keywords: ['handbag', 'luxury', 'Louis Vuitton'],
		manufacturer: 'Louis Vuitton',
	},
	{
		name: 'Google Pixel 6',
		ref: '0023',
		stock: 10,
		location: {
			row: '23',
			lane: '23',
			shelf: '23',
		},
		category: 'Electronics',
		keywords: ['smartphone', 'Google', 'Android'],
		manufacturer: 'Google',
	},
	{
		name: 'Fender Stratocaster',
		ref: '0024',
		stock: 4,
		location: {
			row: '24',
			lane: '24',
			shelf: '24',
		},
		category: 'Music',
		keywords: ['guitar', 'Fender', 'instrument'],
		manufacturer: 'Fender',
	},
	{
		name: 'Patek Philippe Nautilus',
		ref: '0025',
		stock: 1,
		location: {
			row: '25',
			lane: '25',
			shelf: '25',
		},
		category: 'Watches',
		keywords: ['luxury', 'timepiece', 'Patek Philippe'],
		manufacturer: 'Patek Philippe',
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
