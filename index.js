const port = 3223;
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const session = require('express-session');

const db = require('./config/db');
const appRouter = require('./routes/appRouter')
const authRouter = require('./routes/authRouter');

const app = express();
app.use((req,res,next)=>{
    res.set('Cache-Control','no-store,no-cache,must-revalidate,private');
    res.set('Pragma','no-cache');
    res.set('Expires','0');
    next();
});

app.use(session({
    secret:'your_secret_key',
    resave:false,
    saveUninitialized:false,
    cookie:{secure:false}
}));

app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist')));
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

function checkAuthentication(req, res, next) {
    if (req.session.isLoggedIn) {
        return next();
    } else {
        return res.redirect('/login');
    }
}

app.use('/',authRouter)
app.use('/',checkAuthentication,appRouter)

app.listen(port,()=>{
    console.log("Server is running");
    console.log(`http://localhost:${port}`);
    
})