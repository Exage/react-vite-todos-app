const express = require('express')
const { getAllUsers, signup, login, updatePassword, updateName } = require('../contollers/usersController')

const router = express.Router()

router.get('/getAll', getAllUsers)
router.post('/signup', signup)
router.post('/login', login)
router.patch('/updatePassword', updatePassword)
router.patch('/updateName', updateName)

module.exports = router