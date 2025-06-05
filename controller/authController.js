const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signup = async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.status(400).send({
            message: 'Name, email and password are required'
        })
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ name, email, password: hashedPassword })
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)
        res.status(201).send({
            message: 'User created successfully',
            user,
            token
        })
    } catch (error) {
        res.status(500).send({
            message: 'User creation failed',
            error
        })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).send({
            message: 'Email and password are required'
        })
    }

    try {
        const allUsers = await User.findAll()
        // console.log("allUsers", allUsers)
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return res.status(401).send({
                message: 'Invalid email or password'
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).send({
                message: 'Invalid email or password'
            })
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        })
        res.status(200).send({
            message: 'Login successful',
            user,
            token
        })

    } catch (error) {
        res.status(500).send({
            message: 'Login failed',
            error
        })
    }
}

module.exports = { signup, login }
