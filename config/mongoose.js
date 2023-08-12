const mongoose=require('mongoose');
//connectiong to database
mongoose.connect('mongodb+srv://KPM111:b2vvNzYEcnzvmZX3@cluster0.rwpsel7.mongodb.net/?retryWrites=true&w=majority');
const db=mongoose.connection;
//cheecking error
db.on('error',console.error.bind(console,'error in connectiong to db'));
//if no error
db.once('open',function(){
console.log('connected to database')
});

module.exports=db
