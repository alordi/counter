const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const Counter = require('./Counter.js');
const Profile = require('./Profile.js');
const Crypto = require('./CryptoHash.js');

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


app.get('/:username', async function(req, res) {
  const conditions = {
    username: req.params.username
  };
  try {
      const profileObj = await Profile.findOne(conditions);
      res.json(profileObj);
  }
  catch(error) {
      res.json({message: error});
  }
});

// register an account
app.post('/register', async function(req, res) {
	const salt = Crypto.generateRandomSalt
	const fields = {
		username: req.params.username,
		password: Crypto.hashPasswordWithSalt(req.params.password, salt),
		salt: salt,
		initcounter: req.params.initcounter,
	};
  try {
      const makeProfile = await Profile.insertOne(fields);
      res.json(makeProfile);
  }
  catch(error) {
      res.json({message: error});
  }
});

//signin user
//take input, check it against database
//username: does it exist?
//password: when salted with user salt and then hashed,
//does it match the entry for the registered user?

//also add session information
app.post('/signin', async function(req, res) {
  const conditions = {
    username: req.params.username
  };
  try {
	//returns Profile json object defined in Profile.js
      const profileObj = await Profile.findOne(conditions);
//      res.json(profileObj);

	//check the password
	const salt = profileObj.salt
	const hash = profileObj.password
	const verify = Crypto.checkPassword(req.params.password, salt, hash)

	//if verify is true, let user login
	//otherwise, fail
  }
  catch(error) {
      res.json({message: error});
  }
});

//we need to clear session information to log user out
//app.get('/signout', async function(req, res) {

	//todo

//});


// get the counters of the user
app.get('/:_id', async function(req, res) {
  const _id = req.params._id;
  try {
      let userCounter = await Counter.findById(_id);
      res.json(userCounter);
  }
  catch(error) {
      res.json({message: error});
  }
});

//post new counter
app.post('/', async function(req, res) {
  const counter = new Counter({
    val: req.body.value
  });

  try {
    //save the post object and save it
    const created = await counter.save();
    console.log(created);
    res.json(created);
  } catch (err) {
    res.json({message: err});
  }
});

/* PUT Requests */
app.put('/:_id/upvote', async function(req, res) {
  const update = {
      $inc : { val: 1}
  }
  const options = {
      upsert: true
  };
  const conditions = {
      _id: req.params._id
  };
  try {
      const upCount = await Counter.findOneAndUpdate(conditions, update, options);
      console.log("counter upvoted");
      res.json(upCount);
  }
  catch(error) {
      res.json({message: error});
  }
});

app.put('/:_id/downvote', async function(req, res) {
  const update = {
      $inc : { val: -1}
  }
  const options = {
      upsert: true
  };
  const conditions = {
      _id: req.params._id
  };
  try {
      const downCount = await Counter.findOneAndUpdate(conditions, update, options);
      console.log("counter downvoted");
      res.json(downCount);
  }
  catch(error) {
      res.json({message: error});
  }
});

/* DELETE Requests */
/*Delete a counter*/
app.delete('/:_id', async function(req, res) {
  const conditions = {
      _id: req.params._id
  }
  try {
      const delCount = await Counter.deleteOne(conditions);
      console.log("counter deleted");
      res.json(delCount);
  }
  catch(error) {
      res.json({message: error});
  }
});
