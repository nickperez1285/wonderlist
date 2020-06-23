const request = require('supertest');
const server = require('../api/server');
const testServer = request(server);
const db = require('../data/dbConfig');

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


describe('Ensures Test are Running in Test ENV', () => {
    it('is using Testing ENV', ()=> {
        expect(process.env.DB_ENV).toBe('testing')
    })
    
})

describe('Checks - endpoints for todo', () => {

    it('_GET_ At root, api is up', () => {
        return testServer
            .get('/')
            .expect(200)
            .then(res => {
                expect(res.body.api).toBe('up')
            })
    })
    
    describe('Checks - endpoints behind Auth Wall', () => {
        it('_POST_ Registers new user', () => {
            return testServer
                .post('/api/auth/register')
                .send(sampleUser)
                .expect(200)
        })

    })


    describe('Login', () => {
        it('_POST_ Login User', async () => {
            const login = await testServer.post('/api/auth/login').send(sampleUser)
                //  expect(login.status).toBe(200)
                 expect(login.body.message).toBe('Welcome jestUser')           
        })
    })


    beforeEach(async () => {
        await db('users').truncate();
    });

})

// return testServer
// .post('/api/auth/login')
// .send(sampleUser)
// .expect(200)

// const login = await testServer
// .post('/api/auth/login')
// .send(sampleUser)
// expect(login.status).toBe(200)