import express from "express";

import controller from "../controller/users.js";

import {
    verifyToken
} from "../middleware/authenticateUser.js";

const router = express.Router();

router

    .route('/', verifyToken)

    .post(controller.logInUser);

export default router;