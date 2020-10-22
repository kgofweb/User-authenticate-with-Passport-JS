const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Model
const User = require('../models/User');

module.exports = function(passport) {
   passport.use(
      new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
         // Match user email
         User.findOne({ email: email })
            .then(user => {
               if(!user) {
                  done(null, false, { message: 'This email is not registered' });
               }

               // Match user password
               bcrypt.compare(password, user.password, (error, isMatch) => {
                  if(error) throw error;

                  // if password is match
                  if(isMatch) {
                     done(null, user);
                  } else {
                     done(null, false, { message: 'Password is not match !' });
                  }
               });
            })
            .catch(error => console.log(error));
      })
   )

   passport.serializeUser((user, done) => {
      done(null, user.id);
   });

   passport.deserializeUser((id, done) => {
      User.findById(id, (user, error) => {
         done(user, error);
      });
   });
}