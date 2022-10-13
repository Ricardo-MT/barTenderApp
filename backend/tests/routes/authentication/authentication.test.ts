import request from 'supertest'
import expressLoader from '../../../loaders/express';
import mongooseLoader from '../../../loaders/mongoose';
describe('Authentication', () => {
    let app;
    let connection;
    beforeAll(async () => {
        connection = await mongooseLoader();
        app = await expressLoader(connection);
        //console.log(app)
    });

    afterAll(async () => {
        await connection.close();
    });
    it('should login an user', async () => {
        const res = await request(app)
            .post('/api/authentication')
            .send({
                email: 'admin@admin.com',
                password: 'admin',
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('user')
        expect(res.body).toHaveProperty('message', 'Inicio de sesión correcto.')
    })
})