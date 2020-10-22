const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/User');

// Register
exports.register = (req, res, next) => {
   const { name, email, password, password2 } = req.body;
   // const validPassword = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
   let errors = [];

   // Check if all fields is not empty
   if(!name || !email || !password || !password2) {
      errors.push({ message: 'Please, complete all fields' });
   }

   // Check password strong
   if(password < 8) {
      errors.push({ message: 'Password must be at least 8 caracters' });
   }

   // Check password match
   if(password != password2) {
      errors.push({ message: 'Password is not match !' });
   }

   if(errors.length > 0) {
      res.render('register', {
         errors,
         name,
         email,
         password,
         password2
      });
   } else {
      // Verify if email is not already use
      User.findOne({ email: email })
         .then(user => {
            if(user) {
               // User exist
               errors.push({ message: 'Email is already use' })
               res.render('register', {
                  errors,
                  name,
                  email,
                  password,
                  password2
               });
            } else {
               // Hash pass
               bcrypt.hash(password, 10)
               .then(hash => {
                  // Create new user in DB
                  const user = new User({
                     name,
                     email,
                     password: hash
                  });
                  user.save()
                     .then(user => {
                        req.flash('success_message', 'You are now register and can login');
                        res.redirect('/users/login');
                     })
                     .catch(error => console.log(error));
               })
               .catch(error => {
                  console.log(error)
               });
            }
         });
   }
}

// Login
exports.login = (req, res) => {
   passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
   })(req, res);
}