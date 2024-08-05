const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '7d' })
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})

        const usersFiltered = users.map(user => {
            const { _id, name, email } = user
            return { _id, name, email }
        })

        res.status(200).json({ users: usersFiltered })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const signup = async (req, res) => {

    const { name, email, password, passwordConfirm } = req.body

    try {
        const user = await User.signup({ name, email, password, passwordConfirm })

        const token = createToken(user._id)

        res.status(200).json({
            name,
            email,
            token
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const login = async (req, res) => {

    const { email, password } = req.body

    try {
        const user = await User.login({ email, password })
        const name = user.name

        const token = createToken(user._id)

        res.status(200).json({ name, email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const updatePassword = async (req, res) => {

    const { email, password, newPassword } = req.body

    try {
        const user = await User.updatePassword({ email, password, newPassword })
        const name = user.name

        const token = createToken(user._id)

        res.status(200).json({ message: 'Password updated successfully', user: {name, email, token} })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const updateName = async (req, res) => {

    const { email, name, newName } = req.body

    try {
        const user = await User.updateName({ email, name, newName })
        const updatedName = newName

        const token = createToken(user._id)

        res.status(200).json({ message: 'Name updated successfully', user: {name: updatedName, email, token} })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { getAllUsers, signup, login, updatePassword, updateName }