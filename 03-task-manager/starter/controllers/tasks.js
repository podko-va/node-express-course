const Task = require('../models/task')

const getAllTasks = (req,res) =>{
    res.send('all items on the screen');
}
const createTask = async (req,res) =>{
    try {
        const task = await Task.create(req.body)
        res.status(201).json({task});
        
    } catch (error) {
        res.status(500).json({msg:error}) 
    }
}
const updateTask = (req,res) =>{
    res.send('task updated');
}
const getTask = (req,res) =>{
    res.send('one task');
}
const deleteTask = (req,res) =>{
    res.send('task deleted');
}

module.exports = {
    getAllTasks, createTask, getTask, updateTask, deleteTask
};