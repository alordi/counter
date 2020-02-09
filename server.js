const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://admin:admin@cluster0-npoku.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

app.use(express.static(__dirname + '/client/build'));

app.get("/", (req, res, next) => {
    res.sendFile("index.html", { root: '/client/build'})
});

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});