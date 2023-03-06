const express = require('express');
const mongoose = require('mongoose');
const app = express();
const process = require('process');
const { fs } = require('fs')
app.listen(9000);
app.use(express.json());
let db_link = 'mongodb+srv://king:king@gist001.xtt8zeu.mongodb.net/test';
mongoose.connect(db_link)
.then(function(db){
    console.log("Database connected");
})
.catch(function(err){
    console.log(err);
})

var res_1 = false; 

const user = express.Router();


app.use('/app',user);

user
.route('/')
.get(getHome)
.post(postHome)

user
.route('/signup')
.get(getSignup)
.post(postSignup)

user
.route('/login')
.get(getLogin)
.post(postLogin)



function getHome(req,res){
    res.sendFile('/page/index.html',{root:__dirname});
    console.log("Index page");
}

function postHome(req,res){
    console.log("Post");
}

function getSignup(req,res){
    res.sendFile('/page/signup.html',{root:__dirname});
    console.log("Signup page");
}

async function postSignup(req,res){
    let obj = req.body;
    let DB_obj = await Full_Detil_User.create(obj);
    console.log(DB_obj);
    res.send(DB_obj);
}

function getLogin(req,res){
    res.sendFile('/page/login.html',{root:__dirname});
}


async function postLogin(req,res){
    let obj = req.body;
    let Find_User_name = await Full_Detil_User.find(obj.User_Id);
    let Find_User_pass = await Full_Detil_User.find(obj.Upass);
    if(Find_User_name != null){
        if(Find_User_pass != null){
            res.send(obj);
        }
        else{
            console.log("password not match");
        }
    }
    else{
        console.log("User Id not match");
    }
}


const UserSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    roll_Number:{
        type:String,
        unique:true,
        require:true
    },
    Aadhaar_Number:{
        type:String,
        unique:true,
        require:true
    },
    Pan_Number:{
        type:String,
        unique:true,
        require:true
    },
    Number:{
        type:String,
        require:true
    },
    User_Id:{
        type:String,
        unique:true,
        require:true
    },
    User_Mail:{
        type:String,
        unique:true,
        require:true
    },
    Upass:{
        type:String,
        require:true
    }
})

const Full_Detil_User = mongoose.model('Full_Detil_User',UserSchema);


const Auth_User = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
     Upass:{
        type:String,
        require:true
    }
})

const Login_user = mongoose.model('Login_user',Auth_User);