const mongoose = require('mongoose');


const TaskSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true,'need name'],
      trim: true,
      maxLength: [20, 'name cannot be more then 20 characters']
   },
   completed: {
      type:Boolean,
      default: false
   } 
}) 

module.exports = mongoose.model('Task', TaskSchema)