const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{type:String,required:true},
    amount:{type:Number,required:true},
    date:{type:Date,required:true},
    description:{type:String},
    username:{type:String}
})

module.exports=mongoose.model('expenses',expenseSchema);