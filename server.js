const morgan = require('morgan');
const path = require('path');

const express = require('express');
const app = express();

//connect to this DB and use the provides Shcema
const db = require('./model/dbAccess');
const Todo = require('./model/Todo');

//Settings
app.set('port',process.env.PORT || 3000)

//Middleware
app.use(morgan('dev'));//shows rounting traffic http codes
app.use(express.json());

//Static/Views files
//console.log(__dirname);
app.use(express.static(path.join(__dirname,'view/public')));

//Routes
app.get('/api', async(req,res) => //Show all Todos
{
    const tasks = await Todo.find();
    res.json({"data":tasks});  
});
//
app.get('/api/:id', async(req,res) => //Show one Todo
{
    const task = await Todo.findById(req.params.id);
    res.json({"data":task});  
});
//
app.post('/api',async (req,res) => //add Todo
{
    const todo  = new Todo(
    {
        data:{
        text:req.body.text,
        complete:false
        }
        //false is default
    });
    //console.log(todo);
    await Todo.create(todo);
    res.json({"STATUS":"Task Saved"});
})
//
app.put('/api/:id',async (req,res) => //edit Todo
{
    //console.log(req.body.text,req.params._id);
    await Todo.findByIdAndUpdate(req.params.id,{$set:{"data.text":req.body.text}});
    res.json("UPDATED");

});
//
app.put('/api/check/:id', async (req,res) => //checks or unchecks Todos
{
    let { id }=req.params
    let { val }=req.body
    //mongodb
    //dot notation to update nested data
    //console.log(val)
    await Todo.findByIdAndUpdate(id,{$set:{"data.complete":val}})
    res.json("TASK CHANGED CHECK");
});
//
app.delete('/api/:id', async (req,res) =>
{
    await Todo.findByIdAndRemove(req.params.id);
    res.json("REMOVED");
});
/////
////
//
//run backend
app.listen(app.get('port'), () =>
{
    console.log(`Server started on http://localhost:${app.get('port')}`);
});
