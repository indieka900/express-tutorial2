import express from 'express';
import dotenv from 'dotenv'
import routers from "./routes/app.mjs" 

const app = express();

dotenv.config()
//middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(routers)

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.cookie("Hello","world", { maxAge: 6000 * 60 })
    res.status(201).send({message: "Hello Joseph, this is working"})
})

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})