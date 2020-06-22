const request = require('supertest');
const server = require('../api/server');
const testServer = request(server);
const db = require('../data/dbConfig');


describe('Ensures Test are Running in Test ENV', () => {
    it('is using Testing ENV', ()=> {
        expect(process.env.DB_ENV).toBe('testing')
    })
})

describe('Checks - endpoints for todo', () => {

    const initialLength = "2";

    it('Server Is Running', () => {
        return testServer
                .get('/')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.body.api).toBe('up')
                })
    })
    it('_GET_ All todos', () => {
        return testServer
                .get('/todos')
                .expect(200)
                .expect('Content-Type', /json/)
                .expect('Content-Length', initialLength)
    })

    describe('Checks - Behind User Wall', () => {

        const sampleUser = {
            username : 'jestUser',
            password : 'jestPassword'
        }

        const sampleTodo = {
            title: "Jest Todo",
            description: "Jest Desc",
            completed: 0,
            user: 1
        }

        beforeEach(async () => {
            await db('users').truncate();
        });

        it('_POST_ Register New User', () => {
            return testServer
                    .post('/api/auth/register')
                    .send(sampleUser)
                    .expect(200)
        })

        it('_POST_ Logs-in with sampleUser', () => {
            return testServer
                    .post('/api/auth/login')
                    .send(sampleUser)
                    .expect(200)
        })

    })
    
})