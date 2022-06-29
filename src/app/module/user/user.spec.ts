import axios from "axios";

import mongoose from "mongoose";

import { register } from "./service";

const user = {
  surname: "Ndamati",
  firstname: "Precious",
  email: "ndamatiprecious2@gmail.com",
  password: "admin@1",
  confirmPassword: "admin@1",
};

const url = "http://127.0.0.1:6000/v1";

describe("Testing User Endpoints ", () => {
  afterAll((done) => {
    mongoose.connection.close();
    done();
  });

  it("POST /register", async () => {
    const res = axios.post(url + "/user/register", user);
    const { success, data } = (await res).data;
    expect(success).toBe(true);
    expect(Object.keys(data).sort()).toEqual(
      [
        "_id",
        "__v",
        "createdAt",
        "updatedAt",
        "surname",
        "firstname",
        "email",
        "tokenRef",
        "token",
      ].sort()
    );
  });

  it("POST /login", async () => {
    const res = axios.post(url + "/user/login", {
      email: user.email,
      password: user.password,
    });
    const { success, data } = (await res).data;
    expect(success).toBe(true);
    expect(Object.keys(data).sort()).toEqual(
      [
        "_id",
        "__v",
        "createdAt",
        "updatedAt",
        "surname",
        "firstname",
        "email",
        "tokenRef",
        "token",
      ].sort()
    );
  });
});
