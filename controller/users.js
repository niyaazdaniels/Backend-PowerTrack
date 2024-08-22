import {
    getExistingusers,
    getExistingUser,
    editExistingUser,
    deleteExistingUser,
    verifyExistingUser,
    registerNewUser,
    getExistingUserEmailAdd
} from '../models/users.js';

import bcrypt from 'bcrypt';

export default {

    getManyUsers: async (req, res) => {

        try {

            const users = await getExistingusers();

            if (!users) {

                throw new Error("No users found!");

            }
            res.send(users);

        } catch (error) {

            console.error("Error in fetching all the users:", error);

            res.status(500).send({
                error: "Internal Server Error"
            });

        }
    },

    registerOneUser: async (req, res) => {

        try {

            const {
                firstName,
                lastName,
                emailAdd,
                userPass
            } = req.body;

            const hash = await bcrypt.hash(userPass, 10);

            await registerNewUser(firstName, lastName, gender, emailAdd, hash);

            res.send('User has been registered successfully!');

        } catch (error) {

            res.status(500).send('Error adding user: ' + error);

        }
    },
    getOneUser: async (req, res) => {

        try {

            const [userId] = +req.params.userID;

            const user = await getExistingUser(userId);

            if (user) {

                res.send(user);

            } else {

                res.status(404).send({
                    error: "User not found"
                });

            }
        } catch (error) {

            res.status(500).send({
                error: "Internal Server Error"
            });

        }
    },

    editOneUser: async (req, res) => {

        try {

            const [user] = await getExistingUser(+req.params.userID);

            let {
                firstName,
                lastName,
                emailAdd,
                userPass
            } = req.body;

            firstName = firstName || user.firstName;

            lastName = lastName || user.lastName;

            emailAdd = emailAdd || user.emailAdd;

            userPass = userPass || user.userPass;


            await editExistingUser(firstName, lastName, emailAdd, userPass, +req.params.userID);

            const updatedUser = await getExistingusers();

            res.json(updatedUser);

        } catch (error) {

            res.status(500).json({
                error: 'An error occurred while editing the user.'
            });
        }
    },

    deleteOneUser: async (req, res) => {

        try {

            const userId = +req.params.userID;

            const deletedUser = await deleteExistingUser(userId);

            if (deletedUser) {

                res.send({
                    message: "User deleted successfully"
                });

            } else {

                res.status(404).send({
                    error: "User not found"
                });

            }
        } catch (error) {

            res.status(500).send({
                error: "Internal Server Error"
            });
        }
    },

    logInUser: async (req, res, next) => {

        try {

            const {
                emailAdd,
                userPass
            } = req.body;

            const hashedPassword = await verifyExistingUser(emailAdd);

            const result = await bcrypt.compare(userPass, hashedPassword);

            let currentUser = await getExistingUserEmailAdd(emailAdd)

            if (result === true) {

                console.log(currentUser);

                res.send({

                    msg: `Welcome back ${emailAdd}!`,

                    token: req.token,

                    user: currentUser,

                });

            } else {

                res.status(401).send({
                    msg: "Password does not match, please try again."
                });
            }
        } catch (error) {

            console.error('Error logging in user: ', error);

            res.status(500).send('Error logging in user.');

        }
    }
}