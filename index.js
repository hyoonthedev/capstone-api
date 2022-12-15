require('dotenv').config();

const PORT = process.env.PORT;
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

// Require Routes
const recipeRoutes = require('./routes/recipes');
const ingredientRoutes = require('./routes/ingredients');
const pantryRoutes = require('./routes/pantry');
const signUpRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');
const profileRoutes = require('./routes/profile');
const favouriteRoutes = require('./routes/favourites');

// Use Routes
app.use('/recipes', recipeRoutes);
app.use('/ingredients', ingredientRoutes);
app.use('/pantry', pantryRoutes);
app.use('/signup', signUpRoutes);
app.use('/login', loginRoutes);
app.use('/profile', profileRoutes);
app.use('/favourite', favouriteRoutes);


app.listen(PORT, () => {
    console.log(`Connected to ${PORT}!`)
})