const request = require('supertest');

const app = require('../../src/App');
const User = require('../../src/app/Users/models/User');

describe('users', () => {

    describe('USERS ROUTES success calls', () => {
        it('should be able to access PRIVATE *GET /users* when authenticated', async () => {
            const response = await request(app)
                .get('/users')
                .set('Authorization', `Bearer ${User.generateToken('1')}`);

            expect(response.status).toBe(200);
            expect(response.body.users).toEqual([
                { id: 3, name: 'claudio', email: 'claudio@hotmail.com' },
                { id: 1, name: 'joao', email: 'joao@gmail.com' },
                { id: 2, name: 'jorge', email: 'joao@outlook.com.br' }
            ]);
        });

        it('should be able to access PRIVATE *GET /users/:id* with your own token', async () => {
            const response = await request(app)
                .get('/users/1')
                .set('Authorization', `Bearer ${User.generateToken('1')}`);

            expect(response.status).toBe(200);
            expect(response.body.user).toEqual({
                id: 1,
                name: 'joao',
                email: 'joao@gmail.com'
            });
        });

        it('should be able to access PRIVATE *PUT /users/:id* with your own token', async () => {
            const response = await request(app)
                .put(`/users/1`)
                .set('Authorization', `Bearer ${User.generateToken('1')}`)
                .send({ name: "alfabeto foda" });

            expect(response.status).toBe(200);
            expect(response.body.updatedUser).toEqual({
                id: 1,
                name: 'alfabeto foda',
                email: 'joao@gmail.com'
            });
        });

        it('should update an user password', async () => {
            const response = await request(app)
                .put(`/users/1`)
                .set('Authorization', `Bearer ${User.generateToken('1')}`)
                .send({ password: '123456', newPassword: '1234567', confirmNewPassword: '1234567' });

            expect(response.status).toBe(200);
            expect(response.body.updatedUser).toEqual({
                id: 1,
                name: 'alfabeto foda',
                email: 'joao@gmail.com'
            });
        });

        it('should be able to access PRIVATE *DELETE /users/:id* with your own token', async () => {
            const response = await request(app)
                .delete('/users/2')
                .set('Authorization', `Bearer ${User.generateToken('2')}`);

            expect(response.status).toBe(204);
        });

        it('should create an user and return the same', async () => {
            const query = {
                "name": "jorginhoa",
                "email": "opa@gmail.com",
                "password": "12354q",
                "confirmPassword": "12354q"
            };
            const response = await request(app)
                .post('/users')
                .set('Content-type', 'application/json')
                .send(query);

            expect(response.status).toBe(201);
            expect(response.body).toEqual({
                user: {
                    id: 5,
                    name: 'jorginhoa',
                    email: 'opa@gmail.com',
                },
                token: expect.any(String)
            });
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
            expect(response.body).toEqual({
                user: {
                    id: 3,
                    name: 'claudio',
                    email: 'claudio@hotmail.com'
                },
                token: expect.any(String)
            });
        });
    });

    describe('USERS ROUTES error calls', () => {
        it("shouldn't create an user / should return error because the invalid format key: email", async () => {
            const query = {
                "name": "jorginhoa",
                "email": "123",
                "password": "12354q",
                "confirmPassword": "12354q",
            };
            const response = await request(app)
                .post('/users')
                .set('Content-type', 'application/json')
                .send(query);

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Formato de e-mail inválido.');
        });

        it("shouldn't create an user / should return error because the different keys: password and confirmPassword", async () => {
            const query = {
                "name": "jorginhoa",
                "email": "claudiaoao@gmail.com",
                "password": "12354q",
                "confirmPassword": "12354aaaaaaaa"
            };
            const response = await request(app)
                .post('/users')
                .set('Content-type', 'application/json')
                .send(query);

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Ambas as senhas devem ser iguais.');
        });

        it("shouldn't create an user with duplicated key: email / should return 422", async () => {
            const query = {
                "name": "jooaoaoo",
                "email": "joao@gmail.com",
                "password": "123455",
                "confirmPassword": "123455"
            }
            const response = await request(app)
                .post('/users')
                .send(query);

            expect(response.status).toBe(422);
            expect(response.body.error).toBe("email já existente.");
        });

        it("shouldn't create an user without user values / should return 422", async () => {
            const query = {}
            const response = await request(app)
                .post('/users')
                .send(query);

            expect(response.status).toBe(422);
        });

        it("shouldn't find an user / should return 404 because the invalid: req.params.id", async () => {
            const response = await request(app)
                .get('/users/a')
                .set('Authorization', `Bearer ${User.generateToken('2')}`);

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Resultado não encontrado.');
        });

        it("shouldn't update an user / should return 404 because the invalid: req.params.id", async () => {
            const response = await request(app)
                .put('/users/a')
                .set('Authorization', `Bearer ${User.generateToken('2')}`);

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Resultado não encontrado.');
        });

        it("shouldn't update an user / should return 422 because the empty req.body", async () => {
            const response = await request(app)
                .put('/users/2')
                .set('Authorization', `Bearer ${User.generateToken('2')}`);

            expect(response.status).toBe(422);
        });

        it("shouldn't update an user password without: newPassword and confirmPassword", async () => {
            const response = await request(app)
                .put(`/users/1`)
                .set('Authorization', `Bearer ${User.generateToken('1')}`)
                .send({ password: "alfabeto foda" });

            expect(response.status).toBe(422);
            expect(response.body.error).toBe('É necessário enviar a antiga senha, a nova e a sua confirmação.');
        });

        it("shouldn't update an user password without current password", async () => {
            const response = await request(app)
                .put(`/users/1`)
                .set('Authorization', `Bearer ${User.generateToken('1')}`)
                .send({ newPassword: "daleee", confirmNewPassword: "daleee" });

            expect(response.status).toBe(422);
            expect(response.body.error).toBe('É necessário enviar a antiga senha, a nova e a sua confirmação.');
        });


        it("shouldn't update an user password with an incorrect current password", async () => {
            const response = await request(app)
                .put(`/users/1`)
                .set('Authorization', `Bearer ${User.generateToken('1')}`)
                .send({ password:"senhaerrada", newPassword: "1234567", confirmNewPassword: "1234567" });

            expect(response.status).toBe(422);
            expect(response.body.error).toBe('Senha incorreta.');
        });

        it("shouldn't update an user password with different newPassword and confirmNewPassword", async () => {
            const response = await request(app)
                .put(`/users/1`)
                .set('Authorization', `Bearer ${User.generateToken('1')}`)
                .send({ password:"1234567", newPassword: "1234567", confirmNewPassword: "1234569" });

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Ambas as senhas devem ser iguais.');
        });

        it("should return 404 when try to access a nonexistent route", async () => {
            const response = await request(app)
                .get('/users/2/rooms')
                .set('Authorization', `Bearer ${User.generateToken('2')}`);

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Resultado não encontrado.');
        });

        it("shouldn't authenticate with invalid credentials", async () => {
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

        it("shouldn't be able to access PRIVATE *GET /users* without token", async () => {
            const response = await request(app)
                .get('/users');

            expect(response.status).toBe(401);
            expect(response.body.error).toBe('Token not provided.');
        });

        it("shouldn't be able to access PRIVATE *GET /users/:id* with a token that is not yours", async () => {
            const response = await request(app)
                .get('/users/1')
                .set('Authorization', `Bearer ${User.generateToken('2')}`);

            expect(response.status).toBe(401);
            expect(response.body.error).toBe('Invalid token.');
        });

        it("shouldn't be able to access PRIVATE *PUT /users/:id* with a token that is not yours", async () => {
            const response = await request(app)
                .put(`/users/1`)
                .set('Authorization', `Bearer ${User.generateToken('3')}`)
                .send({ name: "alfabeto foda" });

            expect(response.status).toBe(401);
            expect(response.body.error).toBe('Invalid token.');
        });

        it("shouldn't be able to access PRIVATE *DELETE /users/:id* with a token that is not yours", async () => {
            const response = await request(app)
                .delete('/users/2')
                .set('Authorization', `Bearer ${User.generateToken('3')}`);

            expect(response.status).toBe(401);
            expect(response.body.error).toBe('Invalid token.');
        });

        it("shouldn't be able to access private routes with malformatted jwt token", async () => {
            const response = await request(app)
                .get('/users')
                .set('Authorization', 'jorge 123123');

            expect(response.status).toBe(401);
            expect(response.body.error).toBe('Token malformatted.');
        });

        it("shouldn't be able to access private routes with invalid jwt token", async () => {
            const response = await request(app)
                .get('/users')
                .set('Authorization', 'Bearer 123123');

            expect(response.status).toBe(401);
            expect(response.body.error).toBe('Invalid token.');
        });

        it("shouldn't be able to access private routes without a part of the jwt token", async () => {
            const response = await request(app)
                .get('/users')
                .set('Authorization', 'Bearer');

            expect(response.status).toBe(401);
            expect(response.body.error).toBe('Token error.');
        });
    });
});