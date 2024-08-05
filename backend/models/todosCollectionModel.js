const mongoose = require('mongoose')

const Schema = mongoose.Schema

const todosCollectionSchema = new Schema({
    title: {
        type: String
    },
    isSameTitle: {
        type: Number
    },
    isPinned: {
        type: Boolean
    },
    todos: {
        type: Array
    },
    userId: {
        type: String
    }
}, { timestamps: true })

todosCollectionSchema.statics.createTodo = async function ({ title, todos, userId, isPinned }) {

    let isSameTitle = 0

    if (title.length === 0) {
        title = 'Untitled'
    }

    const similarTitles = await this.find({ title, userId })

    if (similarTitles.length > 0) {
        isSameTitle = Math.max(...similarTitles.map(todo => todo.isSameTitle)) + 1
    }

    const todosCollection = this.create({ title, todos, userId, isSameTitle, isPinned })

    return todosCollection

}

todosCollectionSchema.statics.updateTodoCollection = async function ({ id, body }) {

    body.isSameTitle = 0

    if (body.title.length === 0) {
        body.title = 'Untitled'
    }

    const existingTodo = await this.findById(id)
    
    const similarTitles = await this.find({ title: body.title, userId: existingTodo.userId, _id: { $ne: id } })

    if (similarTitles.length > 0) {
        body.isSameTitle = Math.max(...similarTitles.map(todo => todo.isSameTitle)) + 1
    }

    await this.findOneAndUpdate({ _id: id }, { ...body })

    return { ...body }

}

module.exports = mongoose.model('TodosCollection', todosCollectionSchema)