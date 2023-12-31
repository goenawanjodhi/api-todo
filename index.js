const express = require('express');
const connectDb = require('./config/dbConnection');
const dotenv = require('dotenv').config();

connectDb();

const app = express();
const port = process.env.PORT || 5002;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://app-todo-six.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.json());
app.get('/', (req, res) => {
    res.json({ message: 'API RUNNING,,,' });
})
app.use('/api/todo', require('./routes/todoRoute'));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
