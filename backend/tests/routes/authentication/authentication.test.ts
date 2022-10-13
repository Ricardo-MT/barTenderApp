import request from 'supertest'
import expressLoader from '../../../loaders/express';

describe('Authentication', () => {
    let app;

    it('should login an user', async () => {
        const res = await request(app)
            .post('/api/authentication')
            .send({
                email: 'admin@admin.com',
                password: 'admin',
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('user')
        expect(res.body).toHaveProperty('message', 'Login successful')
    })
})