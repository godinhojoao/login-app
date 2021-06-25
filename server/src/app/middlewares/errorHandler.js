module.exports = (err, req, res, next) => {
    if (err) {
        if (err.status) {
            res.status(err.status).json({ "error": err.message });
        }

        // duplicated key code in psql
        else if (err.code === '23505') {
            const getDuplicatedKey = /_(.*)_/;
            const duplicatedKey = err.constraint.match(getDuplicatedKey)[1];

            res.status(422).json({ "error": `${duplicatedKey} já existente.` });
        }

        else {
            res.status(500).json({ "error": "Houve um erro no servidor." });
        }
    }
};