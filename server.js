const express = require('express');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
//const popup = require('popups');
const path = require('path');
const app = express();
var connection = require('./config');
const port = 5000;

var authenticateController=require('./routes/authenticate-controller');
var registerController=require('./routes/reg-controller');
var admauth=require('./routes/adm-authenticate');
var admreg=require('./routes/adm-reg');
var wsreg = require('./routes/ws-reg');

var sess;

var signed = 0;
 

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// routes for the app


// set the app to listen on the port
app.get('/',(req,res)=>{
    res.render("pages/main");
});

app.get('/userlogin',(req,res)=>{
    sess = req.session;
    console.log("Ivdundtto");
    console.log(sess);
    if(sess.college){
        res.redirect("/dashboard");
    }else{
    var title = "User Login";
    res.render("pages/userlogin",{
        title:title,
        sess:sess
    });
    }   
});

app.get('/adminlogin',(req,res)=>{
    sess = req.session;
    res.render("pages/adminlogin",{
        sess:sess
    });
});

app.get('/usersignup',(req,res)=>{
    sess = req.session;
    res.render("pages/usersignup",{
        sess:sess
    });
});

app.get('/wsreg',(req,res)=>{
    sess = req.session;
    res.render("pages/workshopreg",{
        sess:sess
    });
});

app.get('/adminsignup',(req,res)=>{
    sess = req.session;
    res.render("pages/adminsignup",{
        sess:sess
    });
});

app.get('/dashboard',(req,res)=>{
    sess = req.session;
    console.log(sess);
    if(sess.email){
        signed = 1;
        res.render("pages/dashboard",{
            email:sess.email,
            results:sess.results,
            signin:signed,
            sess:sess
        });
    }else{
        res.redirect("/userlogin");
    }
});

app.get('/logout',(req,res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        // res.redirect('/userlogin');
    });
    sess = req.session;
    console.log(sess);
    res.redirect('/userlogin');

});


app.post('/api/register',registerController.register);
app.post('/api/authenticate',authenticateController.authenticate);
 
//console.log(authenticateController);
app.post('/routes/reg-controller', registerController.register);
app.post('/routes/authenticate-controller', authenticateController.authenticate);
app.post('/routes/admreg', admreg.register);
app.post('/routes/admauth', admauth.authenticate);
app.post('/routes/wsreg', wsreg.register);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
