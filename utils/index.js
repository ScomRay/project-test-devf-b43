const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary').v2
const JWT_SECRET = process.env.JWT_SECRET

cloudinary.config({
    cloudName: process.env.CLOUD_NAME,
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET
})

module.exports = {
    createToken: (payload) => {
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h'})
        return token
    },
    uploadFile: (tempFile) => {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(tempFile, (err, res) => {
                err ? reject(err) : resolve(res)
            })
        })
    }
}