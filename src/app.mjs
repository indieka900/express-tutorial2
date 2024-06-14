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

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})