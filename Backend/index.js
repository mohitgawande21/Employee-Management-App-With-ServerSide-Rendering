require('dotenv').config()
const express=require('express')
const app= express()
const path =require('path')
const port=2000;
const employeeRouter = require('./Routes/Employee.Route')
const mongoose=require('mongoose')
const db=mongoose.connection
const url=process.env.DATABASE_URL
const cors = require('cors')
mongoose.connect(url)

db.on('error', console.log)

db.once('open', () => {
    console.log('connection to mongodb started successfully')
})


app.use(cors()) // Use this after the variable declaration
app.use(express.json())

app.use('/employee',employeeRouter)

//static file rendering
app.use(express.static(path.join(__dirname, '../Frontend/build')))

app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/build/index.html'))
})

// app.listen(port,()=>{
//     console.log(`express app is listening on https://localhost:${port}/employee`)
// })

app.listen(port,()=>{
    console.log(`express app is listening on http://localhost:${port}/`)
})