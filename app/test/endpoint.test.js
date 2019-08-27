import "@babel/polyfill"
import request from "request-promise"
import supertest from "supertest"
const URL = "http://localhost:5000/api"
const API = supertest(URL)
let TOKEN = null

/**
 * Create default user and get a token
 */
beforeAll(async ( done ) => {
    const response = await request({
        uri: `${URL}/users`,
        formData: {
            name: "Cristian",
            lastname: "Santos",
            email: "cysantos21@gmail.com",
            phone: "3006314451",
            password: "Password01"
        },
        method: "POST",
        json: true
    })

    TOKEN = response.token
    done()
})

/** Clean DB after all tests */
afterAll(async () => {
    return request({
        uri: `${URL}/db`,
        json: true,
        method: "DELETE"
    })
})


describe('PING to server', () => {
    test('Server health (Ping)', async () => {
        const { body } = await API.get('/ping')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)

        expect(body).toContainKeys([ 'requestIp', 'message' ]);
        expect(body.message).toBe("Pong. API v1.0 está funcionando!")
    })
})

describe('User sessions', () => {
    test('It should login correctly', async () => {
        const { body } = await API.post('/login')
            .send({
                email: "cysantos21@gmail.com",
                password: "Password01"
            })
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)

        expect(body.error).toBe(false)
        expect(body.token).toBeDefined()
    })

    test('Login should fail', async () => {
        const { body } = await API.post('/login')
            .send({
                email: "cysantos21@gmail.com",
                password: "WrongPassword2019"
            })
            .set('Accept', 'application/json')
            .expect(401)
            .expect('Content-Type', /json/)

        expect(body.error).toBe(true)
        expect(body.message).toBe("Invalid credentials.")
    })
})


describe('Tasks and Project Operations', () => {
    test('It should create a Task without data provided', async () => {
        const { body } = await API
            .post('/tasks')
            .send({})
            .set('Authorization', `Bearer ${TOKEN}`)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)

        expect(body.error).toBe(false)
        expect(body.task).toContainKeys([ 
            '_id', 
            'name',
            'estimate',
            'state',
            'creator' 
        ]);
        expect(body.task.estimate).toBeNumber()
        expect(body.task.active).toBe(true)
    })

    test('It should create a Project and a Task associated', async () => {
        /** Create project */
        const { body: project } = await API
            .post('/projects')
            .send({
                name: "Proyecto con usuario asociado",
                description: "Proyecto ejemplo para test de API ...",
                users: [ ]
            })
            .set('Authorization', `Bearer ${TOKEN}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            

        expect(project.error).toBe(false)
        expect(project.project).toContainKeys([
            '_id', 
            'name',
            'creator',
            'description' 
        ]);
        expect(project.project.users).toBeArray()

        /** Create Task to Project */
        const { body } = await API
            .post('/tasks')
            .send({
                name: "Tarea asociada a proyecto",
                description: "Esta es una tarea asociada a un proyecto",
                estimate: 18000,
                projectId: project.project._id
            })
            .set('Authorization', `Bearer ${TOKEN}`)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)

        expect(body.error).toBe(false)
        expect(body.task).toContainKeys([ 
            '_id', 
            'name',
            'estimate',
            'state',
            'creator' 
        ]);
        expect(body.task.estimate).toBeNumber()
        expect(body.task.active).toBe(true)
    })

    test('It should return a list of tasks', async () => {
        const { body } = await API
            .get('/tasks')
            .set('Authorization', `Bearer ${TOKEN}`)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)

        expect(body.error).toBe(false)
        expect(body.tasks).toBeDefined()
        expect(body.tasks).toBeArray()
        expect(body.tasks).toHaveLength(body.totalMatches)
    })

    test('It should create a MANUAL record', async () => {
        /** Create a task */
        const { body: task } = await API
            .post('/tasks')
            .send({})
            .set('Authorization', `Bearer ${TOKEN}`)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)

        
        const time = 3600
        /** Create MANUAL Record */
        const { body } = await API
            .post('/tasks/record')
            .send({
                trackingMode: "MANUAL",
                task: task.task._id,
                time
            })
            .set('Authorization', `Bearer ${TOKEN}`)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)

        expect(body.error).toBe(false)
        expect(body.record.trackingMode).toBe("MANUAL")
        expect(body.record.time).toBe(time)
        expect(body.record.active).toBe(false)
        expect(body.record.start).toBeNil()
        expect(body.record.end).toBeNil()
    })

    test('It should create a CLOCK record and then close it', async () => {
        /** Create a task */
        const { body: task } = await API
            .post('/tasks')
            .send({})
            .set('Authorization', `Bearer ${TOKEN}`)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)

        
        /** Create CLOCK Record */
        const { body } = await API
            .post('/tasks/record')
            .send({
                trackingMode: "CLOCK",
                task: task.task._id
            })
            .set('Authorization', `Bearer ${TOKEN}`)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)

        expect(body.error).toBe(false)
        expect(body.record.trackingMode).toBe("CLOCK")
        expect(body.record.time).toBeNil()
        expect(body.record.currentTime).toBe(0)
        expect(body.record.active).toBe(true)
        expect(body.record.start).toBeDefined()
        expect(body.record.end).toBeNil()

        /** Close CLOCK Record */
        const { body: _body_ } = await API
            .put('/tasks/record/' + task.task._id)
            .send({})
            .set('Authorization', `Bearer ${TOKEN}`)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)

        expect(_body_.error).toBe(false)
        expect(_body_.record.trackingMode).toBe("CLOCK")
        expect(_body_.record.time).toBeNumber()
        expect(_body_.record.currentTime).toBeNil()
        expect(_body_.record.active).toBe(false)
        expect(_body_.record.start).toBeDefined()
        expect(_body_.record.end).toBeDefined()
    })

    test('It should return a list of records', async () => {
        /** Create a task */
        const { body: task } = await API
            .post('/tasks')
            .send({})
            .set('Authorization', `Bearer ${TOKEN}`)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)

        
        /** Create CLOCK Record */
        await API
            .post('/tasks/record')
            .send({
                trackingMode: "CLOCK",
                task: task.task._id
            })
            .set('Authorization', `Bearer ${TOKEN}`)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)


        const { body } = await API
            .get('/tasks/record/' + task.task._id)
            .set('Authorization', `Bearer ${TOKEN}`)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)

        expect(body.error).toBe(false)
        expect(body.records).toBeDefined()
        expect(body.records).toBeArray()
        expect(body.records).toHaveLength(body.totalMatches)
    })

    test('It should return a pending record', async () => {
        /** Create a task */
        const { body: task } = await API
            .post('/tasks')
            .send({})
            .set('Authorization', `Bearer ${TOKEN}`)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)

    
        /** Create CLOCK Record */
        await API
            .post('/tasks/record')
            .send({
                trackingMode: "CLOCK",
                task: task.task._id
            })
            .set('Authorization', `Bearer ${TOKEN}`)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)


        /** Look for pending records */
        const { body: pending } = await API
            .get('/tasks/open')
            .set('Authorization', `Bearer ${TOKEN}`)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)

        expect(pending.error).toBe(false)
        expect(pending.records).toBeArray()
        expect(pending.records).toHaveLength(1)
    })
})

