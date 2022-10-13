import { Application } from 'express';
import request from 'supertest'
import expressLoader from '../../../loaders/express';

describe('Server status', () => {
    let app: Application;
    beforeAll(async () => {
        app = await expressLoader();
    });

    it('should be online', async () => {
        // const res = await request(app)
        //     .post('/api/authentication')
        //     .send({
        //         email: 'admin@admin.com',
        //         password: 'admin',
        //     })
        // expect(res.statusCode).toEqual(200)
        // expect(res.body).toHaveProperty('user')
        // expect(res.body).toHaveProperty('message', 'Login successful')
        const res = await request(app)
            .get('/status')
            .send()

        expect(res.statusCode).toEqual(200)
    })
})