import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"))
//to set the cookie and read the cookie
app.use(cookieParser())

//routes import 
import userRoutes from './routes/user.routes.js';

//routes declartion
app.use('/api/v1/users', userRoutes)

export { app }  