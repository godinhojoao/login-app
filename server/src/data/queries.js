const knex = require('../infra/database');
const createError = require('http-errors');

module.exports = (tableName) => {

    class DB {
        constructor() {
            this.tableName = tableName;
        }

        async getAll() {
            try {
                const allResults = await knex.select().from(this.tableName).orderBy('id');
                return allResults;
            } catch (err) {
                throw err;
            }
        }

        async findOne(options) {
            try {
                const result = await knex.select().from(this.tableName).where('id', options.id);
                if (result.length < 1) throw createError(404, 'Resultado não encontrado.');
                return result;
            } catch (err) {
                throw err;
            }
        }

        async findByEmail(options) {
            try {
                const result = await knex.select().from(this.tableName).where('email', options.email);
                if (result.length < 1) throw createError(401, "Email ou senha incorretos.");
                return result;
            } catch (err) {
                throw err;
            }
        }

        async create(options) {
            try {
                const newResult = await knex(this.tableName).insert(options.value).returning('*');
                return newResult;
            } catch (err) {
                throw err;
            }
        }

        async update(options) {
            try {
                const updatedResult = await knex(this.tableName)
                    .where('id', options.id)
                    .update(options.value)
                    .returning('*');
                return updatedResult;
            } catch (err) {
                throw err;
            }
        }

        async delete(options) {
            try {
                await knex(this.tableName).where('id', options.id).del();
                return;
            } catch (err) {
                throw err;
            }
        }
    }

    return new DB();
}