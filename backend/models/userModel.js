const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
})

userSchema.statics.signup = async function({name, email, password, passwordConfirm}) {
    
    if (!name || !email || !password || !passwordConfirm) {
        throw Error('All fields must be filled in!')
    }

    if (password.length < 6) {
        throw Error('Password must be more than 6 characters long!')
    }

    const isExist = await this.findOne({ email })

    if (isExist) {
        throw Error('This user already exists!')
    }

    if (password !== passwordConfirm) {
        throw Error('Password mismatch!')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await this.create({ name, email, password: hashedPassword })

    return user

}

userSchema.statics.login = async function({email, password}) {
    
    if (!email || !password) {
        throw Error('All fields must be filled in!')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('This user was not found!')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password!')
    }

    return user

}

userSchema.statics.updatePassword = async function({ email, password, newPassword}) {
    
    if ( !password || !newPassword) {
        throw Error('All fields must be filled in!')
    }

    if ( password === newPassword ) {
        throw Error('Passwords must be diffrent')
    }

    if (newPassword.length < 6) {
        throw Error('Password must be more than 6 characters long!')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('User not found')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect current password!')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    const updatedUser = await this.findOneAndUpdate({ email }, { password: hashedPassword })

    return updatedUser

}

userSchema.statics.updateName = async function({ email, name, newName }) {
    
    if ( !newName ) {
        throw Error('All fields must be filled in!')
    }

    if ( name === newName ) {
        throw Error('Names must be diffrent')
    }

    const user = await this.findOneAndUpdate({ email }, { name: newName })

    return user

}

module.exports = mongoose.model('User', userSchema)