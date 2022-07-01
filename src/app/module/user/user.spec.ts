import axios from "axios";

import mongoose from "mongoose";

const user = {
  surname: "Ndamati",
  firstname: "Precious",
  email: "ndamatiprecious@gmail.com",
  password: "admin@1",
  confirmPassword: "admin@1",
};

const user2 = {
  surname: "Ndamati",
  firstname: "Precious",
  email: "ndamatiprecious1@gmail.com",
  password: "admin@1",
  confirmPassword: "admin@",
};

const url = "http://127.0.0.1:6000/v1";

describe("Testing All User Endpoints ", () => {
  afterAll((done) => {
    mongoose.connection.close();
    done();
  });
  describe("Testing @POST /user/register Endpoints", () => {
    it("Test case: Testing for successful registration", async () => {
      try {
        const { data } = await axios.post(url + "/user/register", user);
        expect(data.success).toBe(true);
        expect(Object.keys(data.data).sort()).toEqual(
          [
            "_id",
            "__v",
            "createdAt",
            "updatedAt",
            "surname",
            "firstname",
            "email",
            "token",
          ].sort()
        );
      } catch (err) {
        expect(err.message).toBe("Request failed with status code 409");
      }
    });

    it("Test Case: Using Registered Email", async () => {
      try {
        const { data } = await axios.post(url + "/user/register", user);
        expect(data.success).toBe(false);
      } catch (err) {
        expect(err.message).toBe("Request failed with status code 409");
      }
    });

    it("Test Case: Using Mis-matched passwords", async () => {
      try {
        const { data } = await axios.post(url + "/user/register", user2);
        expect(data.success).toBe(false);
      } catch (err) {
        expect(err.message).toBe("Request failed with status code 400");
      }
    });
  });

  describe("Testing @POST /user/login Endpoints", () => {
    it("Test case: succesful login ", async () => {
      try {
        const { data } = await axios.post(url + "/user/login", {
          email: user.email,
          password: user.password,
        });
        expect(data.success).toBe(true);
        expect(Object.keys(data.data).sort()).toEqual(
          [
            "_id",
            "__v",
            "createdAt",
            "updatedAt",
            "surname",
            "firstname",
            "email",
            "token",
          ].sort()
        );
      } catch (err) {
        expect(err.message).toBe("Request failed with status code 409");
      }
    });

    it("Test case: login with incorrect e-mail ", async () => {
      try {
        const { data } = await axios.post(url + "/user/login", {
          email: user2.email,
          password: user.password,
        });
        expect(data.success).toBe(false);
        console.log(data)
      } catch (err) {
        console.log(err.response.data.message);
      }
    });

    it("Test case: login with incorrect passwword ", async () => {
      
       try {
           const {data} = await axios.post(url + "/user/login", {
          email: user2.email,
          password: user.password,
        });
        expect(data.success).toBe(false);
       } catch (err) {
          console.log(err.response.data.message)
       }

    });

    it("Test case: Exceeding 3 Attempts ", async () => {
      try {
        for (let i = 0; i < 4; i++) {
          await axios.post(url + "/user/login", {
            email: user2.email,
            password: user2.password,
          });
        }
        const { data } = await axios.post(url + "/user/login", {
          email: user2.email,
          password: user2.password,
        });

        expect(data.success).toBe(false);
      } catch (err) {
         console.log(err.response.data.message);
      }
    });
  });
});
