import { Application } from 'express';
import request from 'supertest'
import expressLoader from '../../../loaders/express';

describe('Server status', () => {
    let app: Application;
    beforeAll(async () => {
        app = await expressLoader();
    });

    it('should be online', async () => {
        const res = await request(app)
            .get('/status')
            .send()

        expect(res.statusCode).toEqual(200)
    })
})