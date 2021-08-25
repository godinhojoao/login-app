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

    async create(userValues) {
        const { name, email, password, confirmPassword } = userValues;
        const validatedUser = userSchema.validate({ name, email, password, confirmPassword });

        validatedUser.value.password = await bcrypt.hash(validatedUser.value.password, 10);

        delete validatedUser.value.confirmPassword;

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

    async update(userValues) {
        const { id, name, email, newPassword, confirmNewPassword } = userValues;
        const validatedUser = userSchema.validate({ name, email, password: newPassword, confirmPassword: confirmNewPassword });

        if (validatedUser.value.password) {
            validatedUser.value.password = await bcrypt.hash(validatedUser.value.password, 10);
        }

        delete validatedUser.value.confirmPassword;

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
            return true;
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