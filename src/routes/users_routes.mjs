import { Router } from "express";
import { query, validationResult, checkSchema, matchedData, param } from "express-validator";
import { mockUsers, resolveUserId } from '../utils/constants.mjs';
import { createuserValidation } from "../utils/validationSchemas.mjs";

const router = Router();

router.get("/", (req, res) => {
    res.status(201).send({message: "Hello Joseph, this is working"})
})

router.get("/api/users",
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

router.post("/api/adduser",checkSchema(createuserValidation),
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

router.put("/api/users/:id", param('id').isInt().withMessage("Id Must be an Integer"),resolveUserId, (req, res) =>{
    const result = validationResult(req);
    console.log(result);
    if(!result.isEmpty()){
        return res.status(400).send({errrors: result.array()})
    }
    const {body, findUserIndex} = req
    const data = matchedData(req)

    if (findUserIndex === -1) return res.sendStatus(200);

    mockUsers[findUserIndex] = { id:mockUsers[findUserIndex].id, ...body }
    return res.status(200).send(mockUsers[findUserIndex])
})

router.get("/api/user/",
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

router.patch("/api/users/:id",resolveUserId,  (req, res) =>{
    const {body, findUserIndex} = req

    if (findUserIndex === -1) return res.sendStatus(200);

    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body }
    return res.status(200).send(mockUsers[findUserIndex])
})

router.delete("/api/users/:id",resolveUserId, (req, res) =>{
    const { findUserIndex} = req
    mockUsers.splice(findUserIndex,1);
    return res.status(200).send(mockUsers);
})

export default router;