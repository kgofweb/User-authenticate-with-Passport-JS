const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// Route homepage
router.get('/', (req, res) => { res.render('welcome') });

// Route dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => { 
   res.render('dashboard', {
      name: req.user.name
   });
});

// Route logout
router.get('/logout', (req, res) => {
   req.logout();
   req.flash('success_message', 'You are now logout');
   res.redirect('/users/login');
});

module.exports = router;