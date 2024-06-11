import express from 'express';
const app = express();

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const port = process.env.PORT || 3000;

var mockUsers = [
    {id:1, username: "Joseph11", displayName: "Jose1"},
    {id:2, username: "Mark", displayName: "Mrk"},
    {id:3, username: "Jemo", displayName: "James"},
    {id:4, username: "Felix", displayName: "Ferrouz"}
]

app.get("/", (req, res) => {
    res.status(201).send({message: "Hello Joseph, this is working"})
})

app.get("/api/users", (req, res) =>{
    //console.log(req.query)
    const {query: {filter, value}, } = req
    //console.log(`filter ${filter} and value${value}`)
    if (filter && value){
        return res.send(mockUsers.filter((user) => user[filter].includes(value)))
    }
    //http://localhost:3000/api/users?filter=displayName&value=r
    return res.status(200).send(mockUsers)
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
    const {body} = req
    const newUser = {
        id: mockUsers.length + 1, ...body
    };
    mockUsers.push(newUser);
    res.status(201).send(mockUsers);
});

app.put("/api/users/:id", (req, res) =>{
    const {body, params:{id}} = req
    var parseId;
    if (id) {
       parseId = parseInt(id) 
    }
    if (isNaN(parseId)){
        return res.status(400).send({message: "Invalid Id"})
    }
    const findUserIndex = mockUsers.findIndex(
        (user) => user.id === parseId
    )

    if (findUserIndex === -1) return res.sendStatus(200);

    mockUsers[findUserIndex] = { id:parseId, ...body }
    return res.status(200).send(mockUsers[findUserIndex])
})


app.patch("/api/users/:id", (req, res) =>{
    const {body, params:{id}} = req
    var parseId;
    if (id) {
       parseId = parseInt(id) 
    }
    if (isNaN(parseId)){
        return res.status(400).send({message: "Invalid Id"})
    }
    const findUserIndex = mockUsers.findIndex(
        (user) => user.id === parseId
    )

    if (findUserIndex === -1) return res.sendStatus(200);

    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body }
    return res.status(200).send(mockUsers[findUserIndex])
})

app.delete("/api/users/:id", (req, res) =>{
    const { params:{ id }} = req
    console.log(id)
    var parseId;
    if (id) {
       parseId = parseInt(id) 
    }
    if (isNaN(parseId)){
        return res.status(400).send({message: "Invalid Id"})
    }
    const findUserIndex = mockUsers.findIndex(
        (user) => user.id === parseId
    );
    mockUsers.splice(findUserIndex,1);
    return res.status(200).send(mockUsers);
})


app.listen(port, () => {
    console.log(`Running on port ${port}`)
})