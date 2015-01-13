var express = require('express');
var hbs = require('hbs');
var path = require('path');
var bodyParser = require('body-parser');
var usersController = require('./controllers/users');

var app = express();
app.set('view engine','html');
app.set('views',path.join(__dirname,'views'));
app.engine('html',hbs.__express);
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
    {
    extended:false
    }));
app.use(express.static('public'));

//Routes
app.get('/',function(request,response)
        {
//            console.log(users.getUsers());
        response.render('index',{title:"Home",users:usersController.getUsers});
        });

app.get('/users/:id',function(request,response)
        {
            var user = usersController.getUser(request.params.id);
        response.render('profile',{title:"User Profile",user:user});           
        });

app.get('/signup',function(request,response)
        {
        response.render('signup',{title: "Signup"})
        });

app.get('/login',function(request,response)
        {
        response.render('login',{tittle:"Login"})
        });

app.get('/aboutus',function(request,response)
        {
        response.render('aboutus',{title:"About us"})
        });

app.post('/login', usersController.postLogin);


app.listen(3000);