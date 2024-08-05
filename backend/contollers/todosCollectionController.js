const mongoose = require('mongoose')
const TodosCollection = require('../models/todosCollectionModel')

const createTodoCollection = async (req, res) => {
    const { title, todos, isPinned } = req.body

    try {
        const userId = req.user._id
        const todosCollection = await TodosCollection.createTodo({ title, todos, userId, isPinned })

        res.status(200).json(todosCollection)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getTodoCollections = async (req, res) => {
    const userId = req.user._id
    const todosCollection = await TodosCollection.find({ userId })

    res.status(200).json(todosCollection.reverse())
}

const getSingleTodoCollections = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such todo collection' })
    }

    const todosCollection = await TodosCollection.findOne({ _id: id })

    if (!todosCollection) {
        return res.status(400).json({ error: 'No such todo collection' })
    }

    res.status(200).json(todosCollection)
}

const deleteTodoCollection = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such todo collection' })
    }

    const todosCollection = await TodosCollection.findOneAndDelete({ _id: id })

    if (!todosCollection) {
        return res.status(400).json({ error: 'No such todo collection' })
    }

    res.status(200).json(todosCollection)
}

const updateTodoCollection = async (req, res) => {
    const { id } = req.params
    const body = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such todo collection' })
    }

    try {
        const todosCollection = await TodosCollection.updateTodoCollection({ id, body })

        res.status(200).json(todosCollection)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { 
    createTodoCollection, 
    getTodoCollections, 
    getSingleTodoCollections,
    deleteTodoCollection,
    updateTodoCollection 
}