import request from "supertest";
import { expect } from "chai";
import config from '../../data/config.js'
import { getToken } from '../auth/getToken.js'
import userData from '../../data/user/add.user.data.js'
import updateData from '../../data/user/update.user.data.js'

async function addUser(payload, token){ //function create user
    const response = await request(config.baseUrl) //url api
    .post("/users") //endpoint 
    .set("Authorization", `Bearer ${token}`) //request header
    .send(payload) //payload

    return (await response)
}


async function getUser(token){ //function get user
    const response = await request(config.baseUrl)
    .get("/users")
    .set("Authorization", `Bearer ${token}`)

    return (await response)
}

async function updateUser(userId, token){ //function update user
    const response = await request(config.baseUrl)

    .put(`/users/${userId}`)
    .set("Authorization", `Bearer ${token}`)
    .send(updateData.SuccessUpdate)

    return (await response)
}

async function getUserId(token, userId){ //function get detail user
    const response = await request(config.baseUrl)

    .get(`/users/${userId}`)
    .set("Authorization", `Bearer ${token}`)

    return (await response)
}

async function deleteUser(token, userId){ //function delete user
    const response = await request(config.baseUrl)

    .delete(`/users/${userId}`)
    .set("Authorization", `Bearer ${token}`)

    return (await response)
}

describe('TS User', () => {
    let userId;

    it ('Add User', async () => { //test case untuk add user
        const token = await getToken() //get token
        const payload = userData.Success //payload ambil dari data
        const response = await addUser(payload, token) 
        
        //assertion menggunakan chai
        expect(response.status).to.equal(201)
        //console.log(response.body.data) //menampilkan respon body

    })

 
    it ('Get list user', async () => {
        const token = await getToken()
        const response = await getUser(token)

        userId = (await response).body.data.users[0].id

        expect(response.status).to.equal(200)
        //console.log(response.body.data)
    })

    it ('Update user', async () => {
        const token = await getToken()
        const response = await updateUser(userId, token)
        
        //console.log({response})
        expect(response.status).to.equal(200)
        //console.log(response.body.data)
    })

    it ('Get list user id', async () => {
        const token = await getToken()
        const response = await getUserId(token,userId)
        
        expect(response.status).to.equal(200)
        //console.log(response.body.data)
    
  
  })
  
  it ('Delete user', async () => {
    const token = await getToken()
    const response = await deleteUser(token,userId)

    expect(response.status).to.equal(200)    //expect(response.status).body.message("User berhasil dihapus")
    //console.log(response.body.message)

  })
})

