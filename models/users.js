import pool from '../config/config.js';

const getExistingusers = async () => {
    const [result] = await pool.query(`
        SELECT * 
        FROM users`);
    return result;
};

const getExistingUser = async (userID) => {

    const [result] = await pool.query(`

        SELECT * 
        FROM users
        WHERE userID = ?`,

        [userID]);

    return result;
};

const getExistingUserEmailAdd = async (emailAdd) => {

    const [result] = await pool.query(`

        SELECT * 
        FROM users
        WHERE emailAdd = ?`,

        [emailAdd]);

    return result;
};

const registerNewUser = async (firstName, lastName, emailAdd, userPass) => {

    const [user] = await pool.query(`

        INSERT INTO users (firstName, lastName, emailAdd, userPass) 
        VALUES (?, ?, ?, ?)`,

        [firstName, lastName, emailAdd, userPass]);

    return getExistingUser(user.insertId);
};

const editExistingUser = async (firstName, lastName, emailAdd, userPass, userID) => {

    const [user] = await pool.query(`

        UPDATE users 
        SET firstName = ?, lastName = ?, emailAdd = ?, userPass = ?
        WHERE userID = ?`,

        [firstName, lastName, emailAdd, userPass, userID]);

    return getExistingusers(user);
};

const deleteExistingUser = async (userID) => {

    const [user] = await pool.query(`

        DELETE FROM users
        WHERE userID = ?`,

        [userID]);

    return getExistingusers(user);
};

const verifyExistingUser = async (emailAdd) => {

    try {

        const [
            [{
                userPass
            }]
        ] = await pool.query(`

            SELECT userPass FROM users 
            
            WHERE emailAdd = ?`,

            [emailAdd]);

        return userPass;

    } catch (error) {

        throw new Error('User not found');

    }
};

export {
    getExistingusers,
    getExistingUser,
    editExistingUser,
    deleteExistingUser,
    verifyExistingUser,
    registerNewUser,
    getExistingUserEmailAdd
};