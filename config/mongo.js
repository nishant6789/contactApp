const mongoose = require('mongoose')
const config = require('./index')

const CONNECTION_URL = `mongodb://${config.db.url}/${config.db.name}`

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', ()=> {
    console.log('Mongo DB has been successfully connected')
})

mongoose.connection.on('reconnected', ()=> {
    console.log('Mongo DB has been reconnected')
})

mongoose.connection.on('error', error => {
console.log('Mongo connection has an error', error)
mongoose.disconnect()
})

mongoose.connection.on('disconnected', () => {
console.log('Mongo connection is disconnected')
})