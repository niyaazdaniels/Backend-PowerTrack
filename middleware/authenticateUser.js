import {
    config
} from 'dotenv';

import jwt from 'jsonwebtoken';

import bcrypt from 'bcryptjs';

import {
    verifyExistingUser
} from '../models/users.js';

config();

const verifyToken = async (req, res, next) => {

    try {

        const {
            emailAdd,
            userPass
        } = req.body;

        const hashedPassword = await verifyExistingUser(emailAdd);

        bcrypt.compare(userPass, hashedPassword, (err, result) => {

            if (err) {

                console.error(err);

                return res.status(500).send('Internal Server Error');

            }
            if (result === true) {

                req.tokenData = {
                    emailAdd: emailAdd
                };

                next();

            } else {

                res.status(401).json({
                    msg: 'Password or Email address does not match'
                });

            }
        });
    } catch (error) {

        console.error('Error verifying token:', error);

        res.status(500).send('Internal Server Error');
    }
};

const createToken = async (req, res, next) => {

    try {

        const {
            emailAdd,
            userPass
        } = req.body;

        const hashedUserPass = await verifyExistingUser(emailAdd);

        if (!hashedUserPass) {

            console.log("User not found");

            return res.status(401).send({
                msg: "User not found"
            });
        }

        const result = await bcrypt.compare(userPass, hashedUserPass);

        if (result === true) {

            console.log("Password matched. Creating token...");

            const token = jwt.sign({
                emailAdd: emailAdd
            }, process.env.SECRET_KEY, {
                expiresIn: '1h'
            });

            console.log("Token created successfully");

            req.token = token;

            next();

        } else {

            console.log("Password does not match");

            return res.status(401).send({
                msg: "The username or password does not match"
            });
        }
    } catch (error) {

        console.error("Error logging in:", error);

        return res.status(500).send('Internal Server Error');
    }
};


export {
    verifyToken,
    createToken
};