require('dotenv').config();

const PORT = process.env.PORT;
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Require Routes
const recipeRoutes = require('./routes/recipes');

// Use Routes
app.use('/recipes', recipeRoutes);

app.listen(PORT, () => {
    console.log(`Connected to ${PORT}!`)
})