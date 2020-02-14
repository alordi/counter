const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Counter = require('./Counter.js');

const profileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
	salt: {
		type: String,
		required: true
	},
    counters: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Counter'
        }],
        default: []
    }
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
