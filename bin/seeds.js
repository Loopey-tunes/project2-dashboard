const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); //to encrypt password
// require("dotenv").config();
const User = require("../models/User.model");

const userData = [
  {
    fullName: {
      firstName: "Linh",
      lastName: "Nguyen",
    },
    username: "linh",
    email: "linh.nh.tyty@gmail.com",
    password: "123Qwe",
    department: "Production",
    role: "Administrator",
  },
  {
    fullName: {
      firstName: "John",
      lastName: "Doe",
    },
    username: "johndoe",
    email: "johndoe@example.com",
    password: "Pass123",
    department: "Production",
    role: "Manager",
    telephone: "1234567890",
    location: "London",
  },
  {
    fullName: {
      firstName: "Jane",
      lastName: "Smith",
    },
    username: "janesmith",
    email: "janesmith@example.com",
    password: "Pass123",
    department: "Human Resources",
    role: "Administrator",
    telephone: "9876543210",
    location: "Lisbon",
  },
  {
    fullName: {
      firstName: "Michael",
      lastName: "Johnson",
    },
    email: "michaeljohnson@example.com",
    password: "Pass123",
    department: "Financial",
    role: "Member",
    location: "Berlin",
  },
];


async function seedData() {
  try {
    /* CONNECT */
    const MONGO_URI =
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/project2-dashboard";
    const conn = await mongoose.connect(MONGO_URI);
    console.log(
      `Connected to Mongo! Database name: "${conn.connections[0].name}"`
    );

    /* DELETE EXISTING DATA */
    //WARNING: this will delete all users in your DB !!
    await User.deleteMany({});

    /* Hash password */
    const saltRounds = 10;

    for (const user of userData) {
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      user.password = hashedPassword;
    }

    /* SEED USERDATA */
    const usersFromDB = await User.insertMany(userData);
    console.log(`Number of user created... ${usersFromDB.length} `);

    /* CLOSE DB CONNECTION */
    mongoose.connection.close();
  } catch (e) {
    console.log("error seeding data in DB....", e);
  }
}

seedData();
