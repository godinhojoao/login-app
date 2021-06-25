const request = require('supertest');

const app = require('../../src/App');
const User = require('../../src/app/Users/models/User');

describe('users', () => {

    describe('success calls', () => {
        it('should return the expected users list', async () => {
            const response = await request(app)
                .get('/users');

            expect(response.status).toBe(200);
            expect(response.body[0].name).toBe('joao');
            expect(response.body.length).toBe(3);
        });

        it('should return the expected user', async () => {
            const response = await request(app)
                .get('/users/1');

            expect(response.status).toBe(200);
            expect(response.body[0].name).toBe('joao');
        });

        it('should create a user', async () => {
            const query = {
                "name": "jorginhoa",
                "email": "opa@gmail.com",
                "password": "12354q"
            };
            const response = await request(app)
                .post('/users')
                .set('Content-type', 'application/json')
                .send(query);

            expect(response.status).toBe(201);
            expect(response.body.user[0].name).toBe('jorginhoa');
            expect(response.body).toHaveProperty('token');
        });

        it('should update a user with your own token', async () => {
            const response = await request(app)
                .put(`/users/1`)
                .set('Authorization', `Bearer ${User.generateToken('1')}`)
                .send({ name: "alfabeto foda" });

            expect(response.status).toBe(200);
            expect(response.body[0].name).toBe('alfabeto foda');
        });

        it('should delete a user with your own token', async () => {
            const response = await request(app)
                .delete('/users/2')
                .set('Authorization', `Bearer ${User.generateToken('2')}`);

            expect(response.status).toBe(204);
        });

        it("shouldn't return the keys: password, updated_at, created_at", async () => {
            const response = await request(app)
                .get('/users/1');

            expect(response.status).toBe(200);
            expect(response.body[0].password).toBe(undefined);
            expect(response.body[0].created_at).toBe(undefined);
            expect(response.body[0].updated_at).toBe(undefined);
        });

        it('should authenticate with valid credentials', async () => {
            const query = {
                "email": "claudio@hotmail.com",
                "password": "123456"
            }
            const response = await request(app)
                .post('/users/login')
                .set('Content-type', 'application/json')
                .send(query);

            expect(response.status).toBe(200);
            expect(response.body.user[0].name).toBe("claudio");
        });

        it('should return a jwt token when auhtenticated', async () => {
            const query = {
                "email": "opa@gmail.com",
                "password": "12354q"
            }
            const response = await request(app)
                .post('/users/login')
                .set('Content-type', 'application/json')
                .send(query);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
        });

        it('should be able to access private routes when authenticated', async () => {
            const user = await User.create({
                "name": "claudinho",
                "email": "claudinho@gmail.com.br",
                "password": "123321"
            });
            const response = await request(app)
                .get('/dashboard')
                .set('Authorization', `Bearer ${User.generateToken(user[0].id)}`);

            expect(response.status).toBe(200);
        });
    });

    describe('error calls', () => {
        it("shouldn't create a user / should return error because the invalid format key: email", async () => {
            const query = {
                "name": "jorginhoa",
                "email": "123",
                "password": "12354q"
            };
            const response = await request(app)
                .post('/users')
                .set('Content-type', 'application/json')
                .send(query);

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Formato de e-mail inválido.');
        });

        it("shouldn't find a user / should return 404 because the invalid: req.params.id", async () => {
            const response = await request(app)
                .get('/users/a');

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Resultado não encontrado.');
        });

        it("should'nt authenticate with invalid credentials", async () => {
            const query = {
                "email": "opa@gmail.com",
                "password": "senha errada"
            }
            const response = await request(app)
                .post('/users/login')
                .set('Content-type', 'application/json')
                .send(query);

            expect(response.status).toBe(401);
            expect(response.body.error).toBe('Email ou senha incorretos.');
        });

        it("shouldn't be able to access private routes whithout jwt token", async () => {
            const response = await request(app)
                .get('/dashboard');

            expect(response.status).toBe(401);
            expect(response.body.error).toBe('Token not provided.');
        });

        it("shouldn't be able to access private routes with malformatted jwt token", async () => {
            const response = await request(app)
                .get('/dashboard')
                .set('Authorization', 'jorge 123123');

            expect(response.status).toBe(401);
            expect(response.body.error).toBe('Token malformatted.');
        });

        it("shouldn't be able to access private routes with invalid jwt token", async () => {
            const response = await request(app)
                .get('/dashboard')
                .set('Authorization', 'Bearer 123123');

            expect(response.status).toBe(401);
            expect(response.body.error).toBe('Invalid token.');
        });

        it("shouldn't be able to access private routes without a part of the jwt token", async () => {
            const response = await request(app)
                .get('/dashboard')
                .set('Authorization', 'Bearer');

            expect(response.status).toBe(401);
            expect(response.body.error).toBe('Token error.');
        });

        it('should not update a user with a token that is not yours', async () => {
            const response = await request(app)
                .put(`/users/3`)
                .set('Authorization', `Bearer ${User.generateToken('2')}`)
                .send({ name: "meu deus du ceu" });

            expect(response.status).toBe(401);
            expect(response.body.error).toBe("Invalid token.");
        });

        it('should not delete a user with a token that is not yours', async () => {
            const response = await request(app)
                .delete('/users/5')
                .set('Authorization', `Bearer ${User.generateToken('1')}`);

            expect(response.status).toBe(401);
            expect(response.body.error).toBe("Invalid token.");
        });

        it('should not create a user with duplicated key: email', async () => {
            const query = {
                "name": "jooaoaoo",
                "password": "123455",
                "email": "joao@gmail.com"
            }
            const response = await request(app)
                .post('/users')
                .send(query);

            expect(response.status).toBe(422);
            expect(response.body.error).toBe("email já existente.");
        });
    });
});