const knex = require('knex')(require('../knexfile'));
const e = require('express');
const jwt = require('jsonwebtoken');
const secretKey = process.env.secretKey;

// Get JWT Token
function getToken(req) {
    return req.headers.authorization.split(" ")[1];
  }

// Authorize JWT Token
function authorize(req, _res, next) {
    const token = getToken(req);
    jwt.verify(token, secretKey, (err, decoded) => {
        if(err) {
          send.status(403).json({
            message: "Wrong Token"
          })
        } req.decoded = decoded;
      });
    }

// Get Profile
exports.getProfile = (req, res,) => {
    authorize(req)
    res.json(req.decoded)
}

// Get User Id
exports.getUserId = (req, res) => {
    knex('users')
        .where({ username: req.params.username })
        .then((data) => {
          if(!data.length){
            res.status(400).send("Invalid User") // Check if user exists
          } else {
            res.status(200).send(data)
          }
        })
        .catch((err) => {
            console.log(err)
        })
    }