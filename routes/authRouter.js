const express = require('express');
const {loginGet,loginPost,signUpGet,signUpPost,logOut} = require('../controllers/authController');

const router = express();

router.get('/login',loginGet);
router.post('/login',loginPost);
router.get('/signup',signUpGet);
router.post('/signup',signUpPost);
router.get('/logout',logOut);

module.exports= router;