const User = require('../models/User');

class UserController {

    async getAll(req, res, next) {
        try {
            const users = await User.getAll();

            res.status(200).json({ users });
        } catch (err) {
            next(err);
        };
    };

    async findOne(req, res, next) {
        const id = req.params.id;
        if (req.userId != id) { return res.status(401).json({ "error": "Invalid token." }) };

        try {
            const [user] = await User.findOne(id);
            delete user.password;

            res.status(200).json({ user });
        } catch (err) {
            next(err);
        };
    };

    async create(req, res, next) {
        try {
            const [newUser] = await User.create(req.body);

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

        const { password, newPassword, confirmNewPassword } = req.body;

        if (password || newPassword || confirmNewPassword) {
            if (!password || !newPassword || !confirmNewPassword) {
                return res.status(422).json({ "error": "É necessário enviar a antiga senha, a nova e a sua confirmação." });
            }

            const [user] = await User.findOne(id);

            if (!(await User.checkPassword(user, password))) {
                return res.status(422).json({ "error": "Senha incorreta." })
            }
        }

        try {
            const [updatedUser] = await User.update({ id, ...req.body });

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

            if (!(await User.checkPassword(user, password))) {
                return res.status(401).json({ "error": "Email ou senha incorretos." });
            }

            delete user.password;

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