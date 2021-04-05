import request from 'supertest';
import app from '../ServerAppExpress';

import createConnection from '../database'
import { getConnection } from 'typeorm';

describe("Surveys",  () => {
    beforeAll( async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    });

    it(">> Should be able to create a new survey", async () => {
        const response = await request(app).post("/surveys").send({
            propried: "e4d62a53-18ca-4582-bff3-6680eb4e462d",
            title: "jest2Test Pesquisa",
            description: "jest2TestUser Pesquisa" 
        })
        expect(response.status).toBe(400);
    });

    it(">> Should be able to get all surverys", async () => {
        await request(app).post("/surveys").send({
            title: "jest2Test Pesquisa",
            description: "jest2TestUser Pesquisa" 
        });
        const response = await request(app).get("/surveys");

        expect(response.body.length).toBe(0);
    })
   
});