import express from "express";

import userController from "../controller/users.js";


const router = express.Router();

router

    .route('/')

    .get(userController.getManyUsers)

    .post(userController.registerOneUser);

router

    .route('/:userID')

    .get(userController.getOneUser)

    .patch(userController.editOneUser)

    .delete(userController.deleteOneUser);


export default router;