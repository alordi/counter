const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const counterSchema = new mongoose.Schema({
    id: {
        type: mongoose.Types.ObjectId,
    },
    val: {
        type: Number,
    }
 });


const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;