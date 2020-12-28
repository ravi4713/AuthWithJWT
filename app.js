
const express = require('express');//express for server
const mongoose = require('mongoose');//mongoose for database
const hbs = require('hbs')//hbs for view engine
const path = require('path')//for joining path
const cookieParser = require('cookie-parser')//for storing data in cookies
const bodyParser = require('body-parser')//for taking data from post method
const {requireAuth} = require('./middleware/authmiddle')//middleware
const app = express();


const router = require('./routes/authroutes');
const { connect } = require('http2');



// view engine

app.set('view engine', 'hbs');
app.set('views',path.join(__dirname,'/views/'));

hbs.registerPartials(path.join(__dirname,'/views/partials/'));


app.use(express.static(__dirname+"/public/"))
app.use(express.json());
app.use(cookieParser());
// database connection

mongoose.connect('mongodb://127.0.0.1:27017/auth',{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true }).then((result) => {app.listen(3000)
console.log('connected')
}).catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies',requireAuth, (req, res) => res.render('smoothies'));

app.use(router)



