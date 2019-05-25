const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

//router.use(express.json())
const mSchema = new mongoose.Schema({
    email : String,
    password : String
})

const Users = mongoose.model('Users', mSchema)
router.get('/', async (req, res) => {
    const finduser = await Users.find()
    res.status(200).send(finduser)
    console.log(finduser)
})

router.post('/', async(req, res) => {
    const users =await new Users({
        email : req.body.email,
        password : req.body.password
    })
    users.save()
})

module.exports = router