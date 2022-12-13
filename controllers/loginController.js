const knex = require('knex')(require('../knexfile'));
const jwt = require('jsonwebtoken');
const secretKey = process.env.secretKey;

exports.loginUser = (req, res) => {
    const { username, password } = req.body
    knex('users') // Check if User Exists
        .where({ username: username})
        .then((response) => {
            if(!response.length) {
                return res.status(403).send('Wrong Credentials, Username or Password is incorrect')
            }
            knex('users') // Check if password for user matches
                .where({ username: username })
                .then((data) => {
                    if(data[0].password === password) {
                        let token = 
                        jwt.sign({ username: username }, secretKey)
                        res.json({token: token})
                    } else {
                        res.status(403).send({
                            token: null
                        })
                    }
                })
        })
}