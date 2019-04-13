const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
var connection = require('./config');
const port = 5000;

var authenticateController=require('./routes/authenticate-controller');
var registerController=require('./routes/reg-controller');
var admauth=require('./routes/adm-authenticate');
var admreg=require('./routes/adm-reg');
 

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// routes for the app
/*
app.get('/', getHomePage);
app.get('/add', addPlayerPage);
app.get('/edit/:id', editPlayerPage);
app.get('/delete/:id', deletePlayer);
app.post('/add', addPlayer);
app.post('/edit/:id', editPlayer);
*/

// set the app to listen on the port
app.get('/',(req,res)=>{
    res.render("pages/index");
});

app.get('/userlogin',(req,res)=>{
    var title = "User Login";
    res.render("pages/userlogin",{
        title:title
    });
});

app.get('/adminlogin',(req,res)=>{
    res.render("pages/adminlogin");
});

app.get('/usersignup',(req,res)=>{
    res.render("pages/usersignup");
});

app.get('/wsreg',(req,res)=>{
    res.render("pages/workshopreg");
});

app.get('/adminsignup',(req,res)=>{
    res.render("pages/adminsignup");
});


app.post('/api/register',registerController.register);
app.post('/api/authenticate',authenticateController.authenticate);
 
//console.log(authenticateController);
app.post('/routes/reg-controller', registerController.register);
app.post('/routes/authenticate-controller', authenticateController.authenticate);
app.post('/routes/admreg', admreg.register);
app.post('/routes/admauth', admauth.authenticate);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
