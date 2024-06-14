import { Router } from "express";
import { query, checkSchema, param } from "express-validator";
import {resolveUserId } from '../utils/constants.mjs';
import { createuserValidation } from "../utils/validationSchemas.mjs";
import { createUser, deleteUser, 
    getUser, getUsers,
    patchUser, putUser } from "../controllers/users-controller.mjs";
//import { createUser } from "../middlewares/users-middleware.mjs";

const router = Router();

router.get("/", (req, res) => {
    res.status(201).send({message: "Hello Joseph, this is working"})
})

router.get("/api/users",
    query('filter').isString().notEmpty().withMessage("Must be not be empty")
    .isLength({min: 3, max: 10}).withMessage("Must be at least 3 - 10 characters"),
    getUsers 
);

router.post("/api/adduser",
    checkSchema(createuserValidation),
    createUser
);

router.put("/api/users/:id", 
    param('id').isInt().withMessage("Id Must be an Integer"),
    resolveUserId,
    putUser 
)

router.get("/api/user/", getUser)

router.patch("/api/users/:id",resolveUserId, patchUser )

router.delete("/api/users/:id",resolveUserId, deleteUser)

export default router;