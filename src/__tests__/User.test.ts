import request from 'supertest';
import app from '../ServerAppExpress';
import { getConnection } from 'typeorm';

import createConnection from '../database'

describe("Users",  () => {
    beforeAll( async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    });

    it(">> Test for create a new user", async () => {
        const response = await request(app).post("/users").send({
            name: "jest2TestUser",
            email: "jest2TestEmail@email.com",
            password: "1235678"
        })
        expect(response.status).toBe(201);
    })

    it(">> Test for create A user using  email go used", async () => {
        const response = await request(app).post("/users").send({
            email: "jest2TestEmail@email.com",
            name: "jest2TestUser",
            password: '1235678'
        })
        expect(response.status).toBe(400);
    })
});