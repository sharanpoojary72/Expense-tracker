const mongoose = require('mongoose');
const userSchema = require('../models/userSchema');
const bcrypt = require('bcrypt');


const loginGet = (req,res)=>{
    res.render('login')
};

const loginPost = async(req,res)=>{
    try {
        const user = await userSchema.findOne({username:req.body.username});

        if(!user){
            return res.send('Username does not Exist');
        }

        const passwordCheck = await bcrypt.compare(req.body.password,user.password);

        if(!passwordCheck){
            return res.send('Invalid Credentials');
        }
        
        req.session.isLoggedIn = true;
        req.session.user = {username:user.username};
        console.log(req.session.user.username);
        
        req.session.userId = user._id;

        res.redirect('/dashboard')
    } catch (error) {
        return res.status('500').send('error')
    }
};

const logOut = (req,res) =>{
    req.session.isLoggedIn = false;
    req.session.destroy((err)=>{
        if(err){
            return res.send(err);
        }
        res.redirect('/login');
    })
}

const signUpGet =(req,res)=>{
    res.render('signUp')
};

const signUpPost =async(req,res)=>{
    
    try{
        const saltRounds =10;
        const hashPassword= await bcrypt.hash(req.body.password,saltRounds);

        const userData = new userSchema({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            email:req.body.email,
            password:hashPassword,
            fName:req.body.fName
        })
        await userData.save();
        console.log('User added');
        
        res.status(200).redirect('/login');
    } catch(error){
        res.status(400).json({message:error.message})
    }
};

module.exports = {loginGet,loginPost,signUpGet,signUpPost,logOut};