import express from 'express';
const app = express();

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const PORT = process.env.PORT || 3000;

const mockUsers = [
    {id:1, username: "Joseph11", displayName: "Jose1"},
    {id:2, username: "Joseph22", displayName: "Jose2"},
    {id:3, username: "Joseph33", displayName: "Jose3"},
    {id:4, username: "Joseph44", displayName: "Jose4"}
]

app.get("/", (req, res) => {
    res.status(201).send({message: "Hello Joseph, this is working"})
})

app.get("/api/users", (req, res) =>{
    res.status(200).send(mockUsers)
})

app.get("/api/users/:id/:name", (req, res) =>{
    const {id,name} = req.params
    var parseId;
    if (id) {
       parseId = parseInt(id) 
    }
    
    if (isNaN(parseId)){
        return res.status(400).send({message: "Invalid Id"})
    }

    const findUser = mockUsers.find((user)=> user.id === parseId)

    if(!findUser) return res.sendStatus(404)

    res.status(200).send(
        findUser
    )
})

app.post("/api/adduser", (req, res) =>{
    res.status(201).send(req.body)
})



app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})