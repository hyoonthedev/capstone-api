require('dotenv').config();

const PORT = process.env.PORT;
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Require Routes
const recipeRoutes = require('./routes/recipes');
const ingredientRoutes = require('./routes/ingredients');
const pantryRoutes = require('./routes/pantry');

// Use Routes
app.use('/recipes', recipeRoutes);
app.use('/ingredients', ingredientRoutes);
app.use('/pantry', pantryRoutes);

app.listen(PORT, () => {
    console.log(`Connected to ${PORT}!`)
})