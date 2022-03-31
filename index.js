const express = require('express')
const authRouter = require('./routers/authRouters')
const constructorRouter = require('./routers/constructorRouter')
const quizRouter = require('./routers/quizRouter')
const questionRouter = require('./routers/questionRouter')
const mongoose = require('mongoose')
const fs = require('fs');
const https = require('https');
const cors = require('cors')

const options = {
    cert: fs.readFileSync('./sslcert/fullchain.pem'),
    key: fs.readFileSync('./sslcert/privkey.pem')
};

require('dotenv').config()


const PORT = process.env.PORT || 8000
const app = express()

app.use('/',(req,res)=>{
    return res.send('Этот сервер работает только в режиме API')
})

app.use(express.json())
app.use(express.static(__dirname+'/public'));
app.use(
    cors({
        // credentials: true,
        // origin: [process.env.URL_CLIENT],
        // optionsSuccessStatus: 200
    })
);
// app.use(require('helmet')());
app.use('/api/auth',authRouter)
app.use('/api/constructor',constructorRouter)
app.use('/api/quiz',quizRouter)
app.use('/api/questions', questionRouter)

const start = async ()=>{
    try {
        await mongoose.connect(process.env.DB_URL)
        https.createServer(options, app).listen(8443);
        app.listen(PORT,()=>{
            console.log(`start on port ${PORT}`)
        })
        // https.createServer(options, app).listen(8443);
    }
    catch (e) {
        console.log(e)
    }

}

start()