const User = require('../models/User');

class UserController {

    async getAll(req, res, next) {
        try {
            const allUsers = await User.getAll();
            allUsers.forEach(user => {
                delete user.password;
                delete user.created_at;
                delete user.updated_at;
            });

            res.status(200).json(allUsers);
        } catch (err) {
            next(err);
        };
    };

    async findOne(req, res, next) {
        const id = req.params.id;

        try {
            const user = await User.findOne(id);
            delete user[0].password;
            delete user[0].created_at;
            delete user[0].updated_at;

            res.status(200).json(user);
        } catch (err) {
            next(err);
        };
    };

    async create(req, res, next) {
        try {
            const newUser = await User.create(req.body);
            delete newUser[0].password;
            delete newUser[0].created_at;
            delete newUser[0].updated_at;

            res.status(201).json({
                user: newUser,
                token: User.generateToken(newUser[0].id)
            });
        } catch (err) {
            next(err);
        };
    };

    async update(req, res, next) {
        const id = req.params.id;
        if (req.userId != id) return res.status(401).json({ "error": "Invalid token." });

        try {
            const updatedUser = await User.update({ id, ...req.body });
            delete updatedUser[0].password;
            delete updatedUser[0].created_at;
            delete updatedUser[0].updated_at;

            res.status(200).json(updatedUser);
        } catch (err) {
            next(err);
        };
    };

    async delete(req, res, next) {
        const id = req.params.id;
        if (req.userId != id) return res.status(401).json({ "error": "Invalid token." });

        try {
            await User.delete(id);
            res.status(204).send();
        } catch (err) {
            next(err);
        };
    };

    async authenticate(req, res, next) {
        const { email, password } = req.body;

        try {
            const user = await User.findByEmail(email);

            if (!(await User.checkPassword(user[0], password))) return res.status(401).json({ "error": "Email ou senha incorretos." });

            delete user[0].password;
            delete user[0].created_at;
            delete user[0].updated_at;

            return res.status(200).json({
                user,
                token: User.generateToken(user[0].id)
            });
        } catch (err) {
            next(err);
        }
    };
};

module.exports = new UserController();