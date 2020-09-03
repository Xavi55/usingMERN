const mongoose = require('mongoose');
const URI = 'mongodb://localhost/todos';

mongoose.connect(URI, {useNewUrlParser:true})
.then(db => 
    {
        console.log('mongoDB OKAY')
    })
.catch(err =>
    {
        console.log('mongoDB err:',err);
    });
module.exports = mongoose;