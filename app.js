const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


// Middleware

app.use(express.static('./public'));
app.use(express.json());

// Config
app.get('/', (req, res) => {
    res.send('Task Manager App');
});

//routes
app.use('/api/v1/tasks', tasks);

app.use(notFound)
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

// To conform the connection is connected to the database or server or not connected

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start();