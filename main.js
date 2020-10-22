const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

// Creta app exp
const app = express();

// Import passport config
require('./config/passport')(passport);

// Import route
const indexRoute = require('./routes/welcome');
const userRoute = require('./routes/users');

// DB connect
const db = require('./config/key').MongoURI;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected...'))
.catch(() => console.log('MongoDB connect failed...'));

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));

// Express session
app.use(session({
   secret: 'secret',
   resave: true,
   saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

// Global variable
app.use((req, res, next) => {
   res.locals.success_message = req.flash('success_message');
   res.locals.error_message = req.flash('error_message');
   res.locals.error = req.flash('error');
   next();
});

// Set EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Route middleware
app.use('/', indexRoute);
app.use('/users', userRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));