const express = require('express')
const { 
    createTodoCollection, 
    getTodoCollections, 
    getSingleTodoCollections,
    deleteTodoCollection,
    updateTodoCollection
} = require('../contollers/todosCollectionController')
const requireAuth = require('../middlewares/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.post('/', createTodoCollection)
router.get('/', getTodoCollections)
router.get('/:id', getSingleTodoCollections)
router.delete('/:id', deleteTodoCollection)
router.patch('/:id', updateTodoCollection)

module.exports = router