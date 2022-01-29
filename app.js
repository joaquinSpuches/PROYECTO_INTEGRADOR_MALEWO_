const express = require('express');
const session = require('express-session')
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware')
const app = express();
const path = require("path");
const usersRouter = require('./routes/users');
const indexRouter = require("./routes");
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const cors = require('cors')

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");



app.use(methodOverride('_method'));
app.use(session({ 
    secret: 'shhh, its a secret',
    resave: false,
    saveUninitialized:false,   
}))
app.use(cors())
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(userLoggedMiddleware)
app.use('/', usersRouter);
app.use("/", indexRouter);
app.use('/products', productRouter );
app.use('/', cartRouter)

// app.use(app.router);
// routes.initialize(app);


app.listen(process.env.PORT || 3050, ()=>{
    console.log('Servidor funcionando')
})







module.exports = app;