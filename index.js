console.log('Server is running...');

const express = require('express');
const dotenv = require('dotenv').config();
const db = require('./config/db');
const port  = process.env.PORT || 5000;
const { errorHandler } = require('./middleware/ErrorHandler');
const app = express();


app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use('/api/users', require('./routes/UserRoutes'));
app.use('/api/auth', require('./routes/AuthRoutes'));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started on port ${ port }`);
});