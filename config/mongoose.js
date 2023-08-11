const mongoose=require('mongoose');
//connectiong to database
mongoose.connect('mongodb://127.0.0.1/project');

const db=mongoose.connection;
//cheecking error
db.on('error',console.error.bind(console,'error in connectiong to db'));
//if no error
db.once('open',function(){
console.log('connected to database')
});

module.exports=db