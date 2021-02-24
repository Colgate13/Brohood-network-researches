import request from 'supertest';
import app from '../ServerAppExpress';

import createConnection from '../database'

describe("Users",  () => {
    beforeAll( async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    it(">> Test for create a new user", async () => {
        const response = await request(app).post("/users").send({
            email: "jest2TestEmail@email.com",
            name: "jest2TestUser" 
        })
        expect(response.status).toBe(201);
    })
    it(">> Test for create A user using Name used", async () => {
        const response = await request(app).post("/users").send({
            email: "jest2TestEmail@email.com",
            name: "jestTestUser" 
        })
        expect(response.status).toBe(400);
    })

    it(">> Test for create A user using  email go used", async () => {
        const response = await request(app).post("/users").send({
            email: "jestTestEmail@email.com",
            name: "jest2TestUser" 
        })
        expect(response.status).toBe(400);
    })
});