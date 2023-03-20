const express = require('express')

const app = express()
const port = process.env.port || "8080"
const contactRouter = require('./routes/contact')
app.set("port",port)

require("./config/mongo.js")

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.get('/', (req,res) => {
    res.status(200).send({success : 1, message : "I am healthy"})
})

app.use('/', contactRouter)
app.listen(port, ()=> {
    console.log(`App running at http://localhost:${port}`)
})