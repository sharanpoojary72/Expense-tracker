const express  = require('express');
const {dashGet,addGet,addPost,listGet, updatePage, updateData} = require('../controllers/appController');

const router = express();

router.get('/dashboard',dashGet);

router.get('/addExpense',addGet);

router.post('/postExpense',addPost);

router.get('/showExpense',listGet);

router.get('/updatePage/:id',updatePage);

router.post('/updateData/:id',updateData)

module.exports=router;