import { Application } from 'express';
import request from 'supertest'
import expressLoader from '../../../loaders/express';

describe('GET orders', () => {
    let app: Application;
    beforeAll(async () => {
        app = await expressLoader();
    });

    it('should have endpoint available', async () => {
        const res = await request(app)
            .get('/api/order')
            .send()

        expect(res.statusCode).toEqual(200)
    })

    it('should have "orders" key with a defined value ', async () => {
        const res = await request(app)
            .get('/api/order')
            .send()

        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('orders')
    })
})

describe('POST orders', () => {
    it('should have endpoint available', async () => {
        let app = await expressLoader();
        const res = await request(app)
            .post('/api/order')
            .send({
                user: 23,
                drink: 'Bmmmmmmmmmmmmmmmmm'
            })

        expect(res.statusCode).not.toEqual(404)
    })

    it('should not allow invalid arguments', async () => {
        let app = await expressLoader();
        const resUserFieldAbsent = await request(app)
            .post('/api/order')
            .send({
                drink: 'BEER'
            })
        expect(resUserFieldAbsent.statusCode).toEqual(400)

        const resInvalidUser = await request(app)
            .post('/api/order')
            .send({
                user: '23',
                drink: 'Bmmmmmmmmmmmmmmmmm'
            })
        expect(resInvalidUser.statusCode).toEqual(400)

        const resDrinkFieldAbsent = await request(app)
            .post('/api/order')
            .send({
                user: 23,
            })
        expect(resDrinkFieldAbsent.statusCode).toEqual(400)

        const resInvalidDrink = await request(app)
            .post('/api/order')
            .send({
                user: 23,
                drink: 'Bmmmmmmmmmmmmmmmmm'
            })
        expect(resInvalidDrink.statusCode).toEqual(400)
    })

    it('should complete successfully', async () => {
        let app = await expressLoader();
        const res = await request(app)
            .post('/api/order')
            .send({
                user: 23,
                drink: 'BEER'
            })

        expect(res.statusCode).toEqual(200)
    })
})