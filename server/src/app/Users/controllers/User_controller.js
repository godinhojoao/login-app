const User = require('../models/User');

class UserController {

    async getAll(req, res, next) {
        try {
            const users = await User.getAll();
            users.forEach(user => {
                delete user.password;
                delete user.created_at;
                delete user.updated_at;
            });

            res.status(200).json({ users });
        } catch (err) {
            next(err);
        };
    };

    async findOne(req, res, next) {
        const id = req.params.id;

        try {
            const [user] = await User.findOne(id);
            delete user.password;
            delete user.created_at;
            delete user.updated_at;

            res.status(200).json({ user });
        } catch (err) {
            next(err);
        };
    };

    async create(req, res, next) {
        try {
            const [newUser] = await User.create(req.body);
            delete newUser.password;
            delete newUser.created_at;
            delete newUser.updated_at;

            res.status(201).json({
                user: newUser,
                token: User.generateToken(newUser.id)
            });
        } catch (err) {
            next(err);
        };
    };

    async update(req, res, next) {
        const id = req.params.id;
        if (req.userId != id) { return res.status(401).json({ "error": "Invalid token." }) };

        try {
            const [updatedUser] = await User.update({ id, ...req.body });
            delete updatedUser.password;
            delete updatedUser.created_at;
            delete updatedUser.updated_at;

            res.status(200).json({ updatedUser });
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
            const [user] = await User.findByEmail(email);

            if (!(await User.checkPassword(user, password))) return res.status(401).json({ "error": "Email ou senha incorretos." });

            delete user.password;
            delete user.created_at;
            delete user.updated_at;

            return res.status(200).json({
                user,
                token: User.generateToken(user.id)
            });
        } catch (err) {
            next(err);
        }
    };
};

module.exports = new UserController();