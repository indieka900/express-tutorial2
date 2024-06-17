import express from 'express';
import dotenv from 'dotenv'
import routers from "./routes/app.mjs" 
import cookieParser from 'cookie-parser';
import session from 'express-session';

const app = express();

dotenv.config()
//middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser('secret'))
app.use(session({
    secret: 'joseph-indieka-secret',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60,
    }
}))

app.use(routers)

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    console.log(req.session)
    console.log(req.sessionID)
    req.session.visited = true
    res.cookie("Hello","world", { maxAge: 6000 * 60 })
    res.status(201).send({message: "Hello Joseph, this is working"})
})



app.listen(port, () => {
    console.log(`Running on port ${port}`)
})