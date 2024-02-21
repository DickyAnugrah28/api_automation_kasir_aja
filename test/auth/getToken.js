import request from "supertest";
import config from '../../data/config.js';
import userData from '../../data/auth/login.data.js'

export async function getToken() {
 
    const response = await request(config.baseUrl)
    .post("/authentications")
    .send(userData.loginSuccess)
    //console.log(response.body.data.accessToken)

   
    return response.body.data.accessToken
   
}

