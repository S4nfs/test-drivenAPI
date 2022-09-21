const request = require('supertest');
const app = require('./app');

describe('Todos API', () => {       //for grouping

    //expecting some kind of array with the shape as it has a name and completed as a boolean
    it('GET /todos --> array todos', () => {
        return request(app).get('/todos').expect('Content-Type', /json/).expect(200).then((response) => {
            expect((response).body).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    completed: expect.any(Boolean),
                }),
            ]))
        })
    });
    //get by id
    it('GET /todos/id --> specific todos by id', () => {
        return request(app).get('/todos/1').expect('Content-Type', /json/).expect(200).then((response) => {
            expect((response).body).toEqual(expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                completed: expect.any(Boolean),
            }))
        })
    });
    //error handler
    it('GET /todos/id --> 404', () => {
        return request(app).get('/todos/9999999').expect(404);
    })
    //create
    it('POST /todos --> created Todo', () => {
        return request(app).post('/todos').send({
            name: 'do dishes',
        }).expect('Content-Type', /json/).expect(201).then((response) => {
            expect((response).body).toEqual(expect.objectContaining({
                name: expect.any(String),
                completed: expect.any(Boolean),
            }))
        })
    });
    //update
    it('POST /todos --> validates request body', () => {
        return request(app).post('/todos').send({
            name: 'Sagar',
        }).expect(422);
    });
});