import express from 'express';
import dotenv from 'dotenv'
import usersRouter from "./routes/users_routes.mjs" 

const app = express();

dotenv.config()
//middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(usersRouter)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})