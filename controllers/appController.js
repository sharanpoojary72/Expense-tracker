const express = require('express');
const mongoose = require('mongoose');
const expenseSchema = require('../models/expenseSchema');

const dashGet = (req, res) => {
    res.render('dashboard')
}

const addGet = (req, res) => {
    res.render('addExpense')
}

const addPost = async (req, res) => {
    
    try {
        const username = req.session.user.username;
        const data = new expenseSchema({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            amount: req.body.amount,
            date: req.body.date,
            description: req.body.description,
            username:username
        })
        await data.save()
        res.status(200).redirect('/showExpense')
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const updatePage = async (req,res) =>{
    try {
        
        const data = await expenseSchema.find({_id:req.params.id});
        
        res.render('updateExpense',{data:data});
    } catch (error) {
        res.status(500).send(error);
    }
}


const updateData = (req, res) => {
    console.log("Update id:", req.params.id); 
    console.log("Update Data:", req.body); 
    const { name, amount, date, description } = req.body;
    expenseSchema.findByIdAndUpdate(
        req.params.id,
        { name, amount, date, description },
        { new: true }
    )
    .then(() => {
        res.redirect('/showExpense');
    })
    .catch(err => {
        console.log(err);
        res.status(500).send('Failed to update data');
    });
};

const listGet = async (req, res) => {
    try {
        const data = await expenseSchema.find();
        res.render('expensedashboard', { data: data });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = { dashGet, addGet, addPost, listGet,updatePage, updateData };