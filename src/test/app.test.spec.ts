// test/app.test.ts
import {app }from '../app'; // Import your Express app
import request from 'supertest';
import { connectDB } from '../app/services/source';
import { Response } from 'express';
import { UserService } from '../app/services/userService';
import { User } from '../app/models/entities/user.entity';


describe('Users', () => {
  let userService: UserService
  beforeAll(async ()=>{
    await connectDB()
    userService = new UserService()
  })
  jest.setTimeout(10000);
  describe("Get users",()=>{
    it('should test that the body contains data as key', async  () => {
      await request(app)
        .get(`/users`)
        .expect(200)
        .expect(res => {
          expect(res.body).toHaveProperty("data");
        });
    });
    it('should test that the body contains data as key', async  () => {
      await request(app)
        .get(`/users`)
        .expect(200)
        .expect(res => {
          expect(res.body).toHaveProperty("data");
        });
    });
  })

  describe("Create user", ()=>{
    const savedUser = {
      "username": "Ernest2",
      "email": "koko1@mailinator.com",
      "id": 3,
      "createdAt": "2023-08-25T20:04:53.537Z",
      "updatedAt": "2023-08-25T20:04:53.537Z"
  };
    it('should test that the body contains data as key', async  () => {
      const createUserMock = jest.spyOn(userService, "createUser")
        // @ts-ignore
        .mockImplementation(async ()=> savedUser);
      await request(app)
        .post(`/users`)
        .send({
          "username":"Ernest2",
          "email": "koko7777@mailinator.com",
          "password": "Password123#"
        })
        .expect(200)
        .expect((res)=> {
          const body = res.body;
          expect(body).toHaveProperty("username5");
          expect(body).toHaveProperty("email");
          expect(body).toHaveProperty("id");
          expect(body).toHaveProperty("createdAt");
          expect(body).toHaveProperty("updatedAt");
        });
    });
  })


  

  it('should return an error for an invalid ID', (done) => {
    const userId = 'invalid';
    request(app)
      .get(`/users/${userId}`)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        // expect(res.body).to.have.property('error', 'Invalid user ID');
        done();
      });
  });
});
