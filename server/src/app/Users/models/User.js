const bcrypt = require('bcrypt');
const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');

const db = require('../../../data/queries')('users');
const userSchema = require('../models/schema/user.schema');

class User {

    async getAll() {
        try {
            const allUsers = await db.getAll();
            return allUsers;
        } catch (err) {
            throw err;
        }
    };

    async findOne(id) {
        id = parseInt(id);

        try {
            const user = await db.findOne({ id });
            return user;
        } catch (err) {
            throw err;
        }
    };

    async findByEmail(email) {
        const validatedEmail = userSchema.validate({ email });

        if (validatedEmail.error) throw createHttpError(400, validatedEmail.error.message);

        try {
            const user = await db.findByEmail({ email: validatedEmail.value.email });
            return user;
        } catch (err) {
            throw err;
        }
    };

    async create(userValue) {
        const { name, email, password } = userValue;
        const validatedUser = userSchema.validate({ name, email, password });
        validatedUser.value.password = await bcrypt.hash(validatedUser.value.password, 10);

        if (validatedUser.error) {
            throw createHttpError(400, validatedUser.error.message);
        }

        try {
            const newUser = await db.create(validatedUser);
            return newUser;
        } catch (err) {
            throw err;
        }
    };

    async update(userValue) {
        const { name, email, password } = userValue;
        let { id } = userValue;

        const validatedUser = userSchema.validate({ name, email, password });

        if (validatedUser.error) {
            throw createHttpError(400, validatedUser.error.message);
        };

        try {
            const updatedUser = await db.update({ id, ...validatedUser });
            return updatedUser;
        } catch (err) {
            throw err;
        }
    };

    async delete(id) {
        id = parseInt(id);

        try {
            await db.delete({ id });
            return;
        } catch (err) {
            throw err;
        }
    };

    async checkPassword(user, passwordToCompare) {
        return await bcrypt.compare(passwordToCompare, user.password);
    }

    generateToken(id) {
        return jwt.sign({ id }, process.env.SECRET_TOKEN);
    };
}

module.exports = new User();