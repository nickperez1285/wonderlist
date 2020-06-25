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
    description: `Jest Desc ${Date.now()}`,
    completed: false,
}


describe('Ensures Test are Running in Test ENV & Is Up', () => {

    it('is using Testing ENV', ()=> {
        expect(process.env.DB_ENV).toBe('testing')
    })

    it('_GET_ At root, api is up', () => {
        return testServer
            .get('/')
            .expect(200)
            .then(res => {
                expect(res.body.api).toBe('up')
            })
    })
})

describe('Register End Points', () => {

    it('_POST_ Login User', async () => {
        let register = await testServer
            .post('/api/auth/register')
            .send(sampleUser)
            .expect(200)

        console.log('Register:',register.body)

        const login = await testServer.post('/api/auth/login').send(sampleUser)
            console.log('Login:',login.body)
             expect(login.status).toBe(200)
             expect(login.body.message).toBe('Welcome jestUser')           
    })

})


describe('Checks - Todo Endpoints', () => {

    it('_POST_ A New Todo', () => {
        return testServer
            .post('/users/1/todos')
            .send(sampleTodo)
            .expect(200)
    })

    it('_PUT_ Edit A Todo', () => {
        return testServer
            .put('/todos/9')
            .send({completed: true})
            .expect(201)

    })

    it('_GET_ All todos', () => {
        return testServer
            .get('/todos')
            .expect(200)
    })

    it('_GET_ Sepcific Todo', () => {
       return testServer
            .get('/todos/9')
            .expect(200) 
    })
})

describe('Checking Delete Request For Todos', () => {

    it('_Delete_ Todo', () => {
        return testServer
            .delete('/todos/1')
            .expect(204)
    })
})

beforeEach(async () => {
    await db('todos').truncate();
    await db('users').truncate();
});


