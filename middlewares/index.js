const jwt = require('jsonwebtoken')

module.exports = {
    validateToken: (req, res, next) => {
        try {
            if (!req.headers.authorization) res.status(403).send({ error: 'Invalid token' })
            const { authorization } = req.headers
            const token = authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.decoded = decoded
            next()
        } catch (error) {
            res.status(409).send({ error })
        }
    }
}