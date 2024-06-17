import { query, validationResult, checkSchema, matchedData, param } from "express-validator";
import { mockUsers } from '../utils/constants.mjs';
//import { createuserValidation } from "../utils/validationSchemas.mjs";


export  const createUser = (req, res) =>{
    const result = validationResult(req);
    console.log(result);
    if(!result.isEmpty()){
        return res.status(400).send({errrors: result.array()})
    }
    const data = matchedData(req)
    //const {body} = req
    const newUser = {
        id: mockUsers.length + 1, ...data
    };
    mockUsers.push(newUser);
    res.status(201).send(mockUsers);
}

export const getUsers = (req, res) =>{
    //console.log(req.query)
    console.log(req.headers.cookies)
    console.log(req.cookies) 

    req.sessionStore.get(req.sessionID, (err, sessionData) => {
        if(err){
            console.log(err);
            throw err;
        }
        console.log("/////////////")
        console.log(sessionData)
    })

    console.log(req.session)
    console.log(req.sessionID)
    const {query: {filter, value}, } = req
    //console.log(`filter ${filter} and value${value}`)
    if (filter && value){
        return res.send(mockUsers.filter((user) => user[filter].includes(value)))
    }
    //http://localhost:3000/api/users?filter=displayName&value=r
    return res.status(200).send(mockUsers)
}

export const putUser = (req, res) =>{
    const result = validationResult(req);
    //console.log(result);
    if(!result.isEmpty()){
        return res.status(400).send({errrors: result.array()})
    }
    const {body, findUserIndex} = req
    const data = matchedData(req)

    if (findUserIndex === -1) return res.sendStatus(200);

    mockUsers[findUserIndex] = { id:mockUsers[findUserIndex].id, ...body }
    return res.status(200).send(mockUsers[findUserIndex])
}

export const getUser = (req, res) =>{
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
}

export const patchUser = (req, res) =>{
    const {body, findUserIndex} = req

    if (findUserIndex === -1) return res.sendStatus(200);

    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body }
    return res.status(200).send(mockUsers[findUserIndex])
}

export const deleteUser = (req, res) =>{
    const { findUserIndex} = req
    mockUsers.splice(findUserIndex,1);
    return res.status(200).send(mockUsers);
}