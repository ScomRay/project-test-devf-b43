require('dotenv').config()
const { app, PORT } = require('./server')
require('./database')

app.listen(PORT, (error) => error ? console.error(error) : console.info(`Server on port ${PORT}`))

