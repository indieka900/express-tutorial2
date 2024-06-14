import express from 'express';
import { query, validationResult, body, matchedData } from "express-validator"
import dotenv from 'dotenv'
const app = express();

dotenv.config()
//middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const port = process.env.PORT || 3000;

const loggingMiddleware = (req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
}

const resolveUserId = (req, res, next) => {
    const {params:{id}} = req
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
    req.findUserIndex = findUserIndex;
    next();
}


var mockUsers = [
    {id:1, username: "Joseph11", displayName: "Jose1"},
    {id:2, username: "Mark", displayName: "Mrk"},
    {id:3, username: "Jemo", displayName: "James"},
    {id:4, username: "Felix", displayName: "Ferrouz"}
]

app.get("/", (req, res) => {
    res.status(201).send({message: "Hello Joseph, this is working"})
})

app.get("/api/users", 
    query('filter').isString().notEmpty().withMessage("Must be not be empty")
    .isLength({min: 3, max: 10}).withMessage("Must be at least 3 - 10 characters"),
    (req, res, next) => {
        const result = validationResult(req);
        console.log(result);
        next();
    }, 
    (req, res) =>{
    //console.log(req.query)
    const {query: {filter, value}, } = req
    //console.log(`filter ${filter} and value${value}`)
    if (filter && value){
        return res.send(mockUsers.filter((user) => user[filter].includes(value)))
    }
    //http://localhost:3000/api/users?filter=displayName&value=r
    return res.status(200).send(mockUsers)
})

app.get("/api/user/",
    // (req, res, next) => {
    //     console.log(`Middleware 2  ${req.method} - ${req.url}`);
    //     next();
    // },
    (req, res) =>{
    const {id} = req.query
    console.log(req.params)
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

app.post("/api/adduser",[ body('username').notEmpty().withMessage("Should not be empty")
    .isLength({min:4, max: 12}).withMessage("Should be between 4-12 characters")
    .isString().withMessage("Must be a String"),
    body('displayName').notEmpty().withMessage('Display-name must not be empty')
    ],
    (req, res, next) => {
        const result = validationResult(req);
        console.log(result);
        if(!result.isEmpty()){
            return res.status(400).send({errrors: result.array()})
        }
        next();
    }, 
    (req, res) =>{
        const data = matchedData(req)
        //const {body} = req
        const newUser = {
            id: mockUsers.length + 1, ...data
        };
        mockUsers.push(newUser);
        res.status(201).send(mockUsers);
    }
);

app.put("/api/users/:id", (req, res) =>{
    const {body, findUserIndex} = req

    if (findUserIndex === -1) return res.sendStatus(200);

    mockUsers[findUserIndex] = { id:mockUsers[findUserIndex].id, ...body }
    return res.status(200).send(mockUsers[findUserIndex])
})


app.patch("/api/users/:id",resolveUserId,  (req, res) =>{
    const {body, findUserIndex} = req

    if (findUserIndex === -1) return res.sendStatus(200);

    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body }
    return res.status(200).send(mockUsers[findUserIndex])
})

app.delete("/api/users/:id",resolveUserId, (req, res) =>{
    const { findUserIndex} = req
    mockUsers.splice(findUserIndex,1);
    return res.status(200).send(mockUsers);
})


app.listen(port, () => {
    console.log(`Running on port ${port}`)
})