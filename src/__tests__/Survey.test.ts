import request from 'supertest';
import app from '../ServerAppExpress';

import createConnection from '../database'

describe("Surveys",  () => {
    beforeAll( async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    it(">> Should be able to create a new survey", async () => {
        const response = await request(app).post("/surveys").send({
            title: "jest2Test Pesquisa",
            description: "jest2TestUser Pesquisa" 
        })
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });

    it(">> Should be able to get all surverys", async () => {
        await request(app).post("/surveys").send({
            title: "jest2Test Pesquisa",
            description: "jest2TestUser Pesquisa" 
        });
        const response = await request(app).get("/surveys");

        expect(response.body.length).toBe(2);
    })
   
});