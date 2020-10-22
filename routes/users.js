const express = require('express');
const router = express.Router();
// Import controller
const userCtrl = require('../controllers/usersCtrl');

// GET routes middleware
router.get('/register', (req, res) => { res.render('register') });
router.get('/login', (req, res) => { res.render('login') });

// POST routes middleware
router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);

module.exports = router;