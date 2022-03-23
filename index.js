const express = require('express')
const authRouter = require('./routers/authRouters')
const constructorRouter = require('./routers/constructorRouter')
const quizRouter = require('./routers/quizRouter')
const questionRouter = require('./routers/questionRouter')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()


const PORT = process.env.PORT || 8000
const app = express()

app.use(express.json())
app.use(express.static(__dirname+'/public'));
app.use(
    cors({
        credentials: true,
        origin: [process.env.URL_CLIENT],
        optionsSuccessStatus: 200
    })
);

app.use('/api/auth',authRouter)
app.use('/api/constructor',constructorRouter)
app.use('/api/quiz',quizRouter)
app.use('/api/questions', questionRouter)

const start = async ()=>{
    try {
        await mongoose.connect(process.env.DB_URL)
        app.listen(8000,()=>{
            console.log(`start on port ${PORT}`)
        })
    }
    catch (e) {
        console.log(e)
    }

}

start()