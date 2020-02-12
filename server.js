const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const Counter = require('./Counter.js');
const Profile = require('./Profile.js');

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

// get user profile data
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

// get the counters of the user
app.get('/:username/counters/:_id', async function(req, res) {
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
    val: req.body.value,
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
router.delete('/:_id', async function(req, res) {
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