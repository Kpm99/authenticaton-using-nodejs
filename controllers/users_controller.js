//user model

const User=require('../models/user')

//profile page
module.exports.profile=async function(req,res){
    
    return res.render('user_profile', {
        title: 'User Profile'
    })
      
}
//user sign in
module.exports.signin=function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
        
    }
    return res.render('signin',{title:"sign in"})
}

//user sign up
module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
        
    }
    return res.render('signup',{title:'sign Up'})
}


//creating new user
module.exports.create=async function(req,res){
    if(req.body.password!=req.body.confirm_password){
        req.flash('error','passwords not matching')
        return res.redirect('back');
    }
    else{
    const user=await User.findOne({email:req.body.email})
    if(!user){
        req.flash('success','user created successfully');
        await User.create(req.body);
       
         return res.redirect('/users/sign-up')
    }
    else{
        req.flash('error','user already exists')
        return res.redirect('/users/sign-in')
    } 
}

}
//create session
module.exports.create_session= function(req,res){
   req.flash('success','logged in successfully')

    return res.redirect('/')
}
//destroy session
module.exports.destroySession=function(req,res){
    req.logout(function(err){
        if(err){
            console.log('error');
            
        }
        req.flash('success','logged out successfully')
    });
    req.flash('success','logged out successfully')
    
    return res.redirect('/')
}