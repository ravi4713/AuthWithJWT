const user = require('../models/user')
const jwt = require('jsonwebtoken')

//handle error
const handelError= (err) => {

    let errors = {email:'',password: ''};
    
    if (err.code === 11000){
        errors.email = 'Email is already registered'
    }

    if (err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(error => {
            errors[error.properties.path] = error.properties.message;
        });
    
    }
    if (err.message.includes('incorrect password')){
        errors['password']='incorrect password';
    }
    if (err.message.includes('incorrect Email')){
        errors['email']='Email Not resgistered';
    } return errors;
}
const creatToken = (id) =>{
    return jwt.sign({id},'net ninja secret',{expiresIn:3*24*60*60})
}

module.exports.signup_get = (req,res)=>{
    res.render('signup');
}

module.exports.signup_post = async (req,res)=>{
    try{
        const users = await user.create(req.body);
        const token = creatToken(user._id)
        res.cookie('jwt',token,{httpOnly:true,maxAge:1000*60*60*24})
        res.status(201)
        res.redirect('/');

    }
    catch (err){
        
        res.status(400);
        res.render('signup',handelError(err));
    }
}

module.exports.login_get = (req,res)=>{
    res.render('login');
}

module.exports.login_post = async (req,res)=>{
    
    try{
        const users = await user.login(req.body.email,req.body.password)
        const token = creatToken(user._id)
        res.cookie('jwt',token,{httpOnly:true,maxAge:1000*60*60*24})
        res.status(200)
        res.redirect('/');
    } catch(e){
        console.log(e)
        res.status(400);
        console.log(handelError(e))
        res.render('login',handelError(e))
    }
}

module.exports.logout_get = (req,res)=>{
    res.cookie('jwt','',{maxAge:1})
    res.redirect('/')
}