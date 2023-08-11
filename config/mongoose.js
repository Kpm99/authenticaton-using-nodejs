const mongoose=require('mongoose');
//connectiong to database
// mongoose.connect('mongodb://127.0.0.1/project');
mongoose.connect('mongodb+srv://souhardyagayen99:I5MNSsLAifJJVhWP@cluster0.tjwzsru.mongodb.net/');
const db=mongoose.connection;
//cheecking error
db.on('error',console.error.bind(console,'error in connectiong to db'));
//if no error
db.once('open',function(){
console.log('connected to database')
});

module.exports=db
