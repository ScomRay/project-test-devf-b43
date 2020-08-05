const userServices = require('../services/userServices')
const utils = require('../utils')

module.exports = {
    create: async (req, res) => {
        try {
            const user = await userServices.create(req.body)
            res.status(201).send({ user })
        } catch (error) {
            res.status(409).send({ error })
        }
    },
    getUsers: async (req, res) => {
        try {
            const users = await userServices.getUsers()
            res.status(200).send({ users })
        } catch (error) {
            res.status(409).send({ error })
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await userServices.getUser(req.params.id)
            res.status(200).send({ user })
        } catch (error) {
            res.status(409).send({ error })
        }
    },
    updateUser: async (req, res) => {
        if(req.files) {
            const { photo } = req.files
            const upload = await utils.uploadFile(photo.tempFilePath)
            if (upload) req.body.photo = upload.url
        }
        try {
            const user = await userServices.getUser(req.params.id)
            const modifiedUser = await userServices.updateUser(user, req.body)
            res.status(200).send( {user: modifiedUser} )
        } catch (error) {
            res.status(409).send( {error} )
        }
    },
    deleteUser: async (req, res) => {
        try {
            const user = await userServices.getUser(req.params.id)
            const modifiedUser = await userServices.updateUser(user, {isActive: false})
            res.status(200).send('User eliminated')
        } catch (error) {
            res.status(409).send( {error} )
        }
    },
    login: async (req, res) => {
        try {
            const user = await userServices.findUserByEmail(req.body.email)
            if (!user) res.status(404).send({ message: 'User not found'})
            const isMatch = userServices.comparePasswords(req.body.password, user.password)
            if (!isMatch) res.status(409).send({ message: 'Invalid password' })
            const payload = {
                name: user.name,
                id: user._id,
                email: user.email
            }
            const token = utils.createToken(payload)
            res.status(200).send({ user, token })
        } catch (error) {
            res.status(409).send({ error })
        }
    }
}