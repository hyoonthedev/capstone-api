const knex = require('knex')(require('../knexfile'));
const { v4: uuid } = require("uuid");

// Signup User
exports.signUpUser = (req, res) => {
    const { username, password } = req.body;
        knex('users') // Check if User Exists
            .where({username: username})
            .then((response) => {
                if(response.length){
                 return res.status(400).send('Username already in use, please choose another')
                };
            knex('users') // After check OK, then insert into DB
                .insert({
                    id: uuid(),
                    username: username,
                    password: password
                })
                .then((_response) => {
                    res.status(201).send('Successfully created user')
                })
                .catch((err) => {
                    console.log(err)
                })
        });
};

