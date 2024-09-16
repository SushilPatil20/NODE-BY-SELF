// importing experss to create an application
const express = require('express')

// Importing the users data
const users = require('./assets/users.json')


// creating application using express
const app = express();
const PORT = 8000;





app.listen(PORT, () => {
    console.log('Server is running on port : ', PORT)
})
