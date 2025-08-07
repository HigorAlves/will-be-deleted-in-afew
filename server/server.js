import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {randomUUID} from 'node:crypto'
import {createTask,deleteTask,getAllTasks,updateTask} from './server/services/task.service.js'

const app = express()
const port = 3000

app.use(cors())
app.luse(bodyParser.json())

let tasks = []

app.post('/tasks', async(req, res) => {
    const {title, completed = false } = req.body
    if(!title) return res.status(400).json({error: 'Title is required'})
    try{
        const task = await createTask({id: randomUUID(), title, completed})
        res.status(201).json(task)
    }catch(err) {
        res.status(500).json({error: 'Failed to create task'})
    }
})

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await getAllTasks()
        return res.json(tasks)
    } catch (e) {
        res.status(500).json({error: 'Failed to list tasks'})
    }
})

app.put('/tasks/:id', async(req, res) => {
    const {id } = req.params
    const {title, completed} = req.body

    try {
        const task = await updateTask(id, {title, completed})
        if(!task) return res.status(404).json({error: 'This task does not exists'})
        return res.json(task)
    } catch (e) {
        return res.status(500).json({error: 'Failed to update task'})
    }
})

app.delete('/tasks/:id', async(req, res) => {
    const {id} = req.params
    const initialLength = tasks.length

    try{
        const isDeleted = await deleteTask(id)
        return res.json({isDeleted})
    }catch (e) {
        return res.status(500).json({error: 'Failed to delete task'})
    }
})

app.listen(port, () => {
    console.log('RUNNING')
})