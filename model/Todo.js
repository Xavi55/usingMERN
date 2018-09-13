const mongoose = require('mongoose');
const Todo = new mongoose.Schema
({
    text:{type:String , required:true},
    complete:Boolean
});

module.exports = mongoose.model('Todo',Todo);