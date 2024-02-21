import request from "supertest";
import { expect } from "chai";
import config from '../../data/config.js'
import payload from '../../data/auth/login.data.js'

export async function login(payload) {
    const response = await request(config.baseUrl)
    .post("/authentications")
    .send(payload)

    return (await response)
 
}

describe('Login Feature', () => {
    it('Success Login', async () => {
        const response = await login(payload.loginSuccess) // payload from data

        // assertion
        expect((await response).status).to.equal(201)
        expect((await response).body.data.user.name).to.equal('Makmur Jaya')
       
        
    })  
},
    it('Failed Login', async () => {
        const response = await login(payload.loginFailed) // payload from data

        // assertion
        expect((await response).status).to.equal(401)
        expect((await response).body.message).to.equal('Kredensial yang Anda berikan salah')
        
    })
)
