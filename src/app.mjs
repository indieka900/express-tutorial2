import express from 'express';
import dotenv from 'dotenv'
import routers from "./routes/app.mjs" 
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport  from 'passport';
import { mockUsers } from './utils/constants.mjs';
import "./strategies/local_stategies.mjs";

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

app.use(passport.initialize())
app.use(passport.session())

app.use(routers)

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    console.log(req.session)
    console.log(req.sessionID)
    req.session.visited = true
    res.cookie("Hello","world", { maxAge: 6000 * 60 })
    res.status(201).send({message: "Hello Joseph, this is working"})
})

/* app.post('/api/auth', (req, res) => {
    const { body : { username, password} } = req
    const findUser =  mockUsers.find((user) => user.username === username)
    if (!findUser || findUser.password !== password) 
        return res.status(401).send({message: "INVALID CREDENTIALS"})
    
    req.session.user = findUser;
    return res.status(200).send(findUser);
})*/

app.post('/api/auth', passport.authenticate('local'), (req, res) => {
    res.sendStatus(200);
})

app.get('/api/auth/status', (req, res) => {
    /*req.sessionStore.get(req.sessionID, (err, sesn) => {
        console.log(sesn);
    })
    return req.session.user 
    ? res.status(200).send(req.session.user) 
    : res.status(401).send({message: "NOT AUTHENTICATED"})*/
    console.log(req.session);
    return req.user ? res.send(req.user) : res.sendStatus(401);
})

app.post("/api/auth/logout", (req, res) => {
    if (!req.user) return res.sendStatus(401);
    req.logout((error) => {
        if (error) return res.sendStatus(400);
        res.send(200);
    })
})

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})