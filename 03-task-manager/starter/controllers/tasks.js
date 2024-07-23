const Task = require('../models/task')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/customErrors')

const getAllTasks = asyncWrapper(async (req,res) =>{
        const tasks = await Task.find({})
        res.
        status(200).
        json({tasks})
        //json({ status:'success', data: {tasks, nbHits: tasks.length }});   
})

const createTask = asyncWrapper(async (req,res) =>{
        const task = await Task.create(req.body)
        res.status(201).json({task});        
    
})

const getTask = asyncWrapper(async (req,res,next) =>{
        const task = await Task.findOne({_id: req.params.id})
        if (!task){
            return next(createCustomError(`No task with id: ${req.params.id}`,404))
        }
        res.status(200).json({ task });
    
})

const deleteTask = asyncWrapper(async (req,res) =>{
        const {id:idTask} = req.params
        const task = await Task.findByIdAndDelete({_id: idTask})
        if (!task){
            return next(createCustomError(`No task with id: ${idTask}`,404))
        }
        res.status(200).json({ task });
})

const updateTask = asyncWrapper(async (req,res) =>{
        const {id:idTask} = req.params;
        const task = await Task.findByIdAndUpdate({_id: idTask},req.body,{
            new:true, 
            runValidators:true,
        })
        if (!task){
            return next(createCustomError(`No task with id: ${idTask}`,404))
        }
        res.status(200).json({task});
})

module.exports = {
    getAllTasks, createTask, getTask, updateTask, deleteTask
};