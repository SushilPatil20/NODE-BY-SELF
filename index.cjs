// importing experss to create an application
const express = require('express')
const fs = require('fs')
// creating application using express
const app = express();
const PORT = 8000;

// Importing the users data
const users = require('./assets/users.json');

// Middleware - Plugin
app.use(express.json());
app.use(express.urlencoded({ extended: false }))



// This is a server side render page
app.get('/users', (req, res) => {
    const html = `<ul>${users.map(user => `
        <li>${user.id}</li>
        <li>${user.first_name}</li>
        `).join("")}</ul>`
    res.send(html);
})


// -------------------- Routes -------------
app
    .route('/api/users')
    // List all the users
    .get((req, res) => {
        return res.json(users);
    })
    // Todo Create new user 
    .post((req, res) => {
        const body = req.body
        users.push({ id: users.length + 1, ...body });
        fs.writeFile('./assets/users.json', JSON.stringify(users), (error, data) => {
            res.status(200).json({ message: 'Data received', status: 'ok' });
        })
    })


// ------------- Route grouping -------------
app
    .route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id)
        const user = users.find((user) => user.id === id);
        return res.json(user)
    }).patch((req, res) => {
        // Todo Edit the user by id
        return res.json({ status: 'Pending' })
    }).delete((req, res) => {
        const id = Number(req.params.id)
        const user = users.find((user) => user.id === id)
        if (user) {
            const newUsers = users.filter((user) => user.id !== id)
            fs.writeFile('./assets/users.json', JSON.stringify(newUsers), (error, data) => {
                res.status(200).json({ status: 'ok', message: `User with id:${id} is deleted..`, });
            })
        }
        else {
            res.status(200).json({ message: `User with id:${id} is not found` })
        }
    });


app.listen(PORT, () => {
    console.log('Server is running on port :', PORT)
})