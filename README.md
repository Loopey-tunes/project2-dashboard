# Filin - Corporate Dashboard
Check the live demo [here](https://filin-corporate-dashboard.adaptable.app), hosted on Adaptable.

## Introduction
Filin Corporate Dashboard is a full-stack web application intended for internal corporate use, facilitating HR and Inventory Management. Designed to meet the needs of real-world workplaces, it is business-oriented and meant for company employees and staff to use with ease. The app is a Minimum Viable Product (MVP) deployed on Adaptable and it follows a comprehensive checklist ensuring robustness, functionality, and user satisfaction.

## How It Works
Built on a stack comprising of Express, Handlebars, JavaScript (JS), MongoDB, Mongoose and Bootstrap, the application offers an intuitive interface for managing HR and Inventory details. The app covers complete CRUD operations on the product and user model, allowing creation, reading, updating, and deletion of resources.

You can create new resources through a simple form or even import data from a CSV file if you need to create multiple products. Our read functionality allows you to view a list of products, filter through them, sort them, and display specific details of a single product. Update functionality provides a pre-populated form with the existing data of a product, easing the editing process. Of course, you can also delete a resource if necessary.

The application has a robust validation system, providing proper feedback in the case of missing or invalid data during the creation and updating of resources.

It includes user authentication, allowing new users to register and returning users to log in. The system handles errors gracefully, providing appropriate feedback in case of login attempts with missing fields or incorrect credentials. Once logged in, the user can also easily log out from their account.

The application also stores session information and makes it available in all of the pages, allowing us to display information conditionally. Certain features are available exclusively to logged-in users, ensuring the privacy and security of the system. This includes functionalities like creation, updating, and deletion of resources.

## Why This Project
We chose this project with a view to the future. We envision the need for such applications in real corporate environments, where systems need to be business-oriented and cater to real employees. Filin Corporate Dashboard is not just a project for us, but a stepping stone towards our future careers, preparing us to design and build practical, user-friendly applications that serve tangible needs.

## Future Improvements
The current version of Filin Corporate Dashboard is responsive, ensuring a user-friendly experience across different devices. Going forward, we plan to continue refining and expanding its features, addressing more aspects of corporate requirements, and enhancing its performance and user interface.

## Contributions
This project is the collective effort by me and my partner. We welcome constructive feedback and suggestions. If you encounter any issues or have any features to request, please raise an issue on this repository.

We hope Filin Corporate Dashboard proves to be a useful tool in managing your company's HR and Inventory needs. We look forward to improving it with your support.

## Instructions

You can fork this repository if you want to work on the app in your own development environment:

- Press the green < > Code button in Github;
- Copy the repository link (https://github.com/Loopey-tunes/project2-dashboard.git);
- In your own IDE run git clone https://github.com/Loopey-tunes/project2-dashboard.git;
- Install all dependencies (shown in package.json) with npm install;
- Create a .env file that holds required environment variables:
      PORT= NUMBER // You can set any NUMBER you want but we recomend choosing a number between 3000 and 5000;
      SESS_SECRET= "sessionSecret" // This can be any STRING you like. We recomend choosing something complex;
      MONGODB_URI= "(mongo database URI)" // You can setup a local database using [MongoDB Compass](https://www.mongodb.com/). By default it connects to 'mongodb://127.0.0.1:27017/project2-dashboard';
      CLOUDINARY_NAME= "cloudinaryName" // The following 3 variables require signing up to [Cloudinary]("https://cloudinary.com/") and use the variables they assign you.
      CLOUDINARY_KEY= "numberString" //
      CLOUDINARY_SECRET= 'string' //
- Run the project locally with the command "npm run dev" or "node server.js";
- In your browser, navigate to http://localhost:PORT/, where port is the NUMBER you assigned in the .env file, for example, http://localhost:3000/


  
