
//require express
const express=require('express');

const app=express();
//port
const port=process.env.PORT || 8000;
const path=require('path');
const expressLayouts=require('express-ejs-layouts')
//database configuration
const db=require('./config/mongoose');
const cookieParser = require('cookie-parser');

//passport configuration
const passport =require('passport');
const passportLocal=require('./config/passport-local-strategy');
const session=require('express-session');

const googlepassport=require('./config/passport-google-oauth-strategy')
const MongoStore=require('connect-mongo')
const flash=require('connect-flash')
const custmonMware=require('./config/middleware')


app.use(express.static('./assets'))
app.use(express.urlencoded())
app.use(cookieParser())
app.use(expressLayouts)

//ejs configuration
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)
//setting up view engine
app.set('view engine','ejs');
app.set('/views','./views')

//express session
app.use(session({
    name:'project',
    secret:'abcd',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },

    store: MongoStore.create({
        mongoUrl:"mongodb+srv://KPM111:b2vvNzYEcnzvmZX3@cluster0.rwpsel7.mongodb.net/?retryWrites=true&w=majority",
        mongooseConnection:db,
        autoRemove:'disabled',

    },function(err){
        console.log(err||'connected to mongo db ')
    })

    
}))


app.use(passport.initialize());
app.use(passport.session())
app.use(passport.setAuthenticated)
app.use(flash())
app.use(custmonMware.setFlash)
//routes
app.use('/',require('./routes'))
//server
app.listen(port,function(err){
    if(err){
        console.log("error");
        return;
    }

    console.log("server started at port:",port);
})
