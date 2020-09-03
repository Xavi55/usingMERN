const mongoose = require('mongoose');
const Todo = new mongoose.Schema
({
	 data:{
    text:{type:String , required:true},
    complete:Boolean
    }
});

module.exports = mongoose.model('Todo',Todo);
