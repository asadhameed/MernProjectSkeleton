const request = require("supertest");
const mongoose = require("mongoose");
const {
  default: userModel,
} = require("../../../../../server/models/user.model");
let server;

describe("Delete User", () => {
  beforeEach(() => {
    server = require("../../../../../server/server").default;
  });
  afterEach(async () => {
    await server.close();
    await userModel.User.deleteMany({});
  });

  describe("Delete owen Profile", () => {
    let _id;
    let user;
    let token;

    beforeEach(async () => {
      user = await userModel.User.create({
        name: "test",
        email: "test@test.com",
        password: "1234567",
      });
      _id = user._id;
      token = user.createToken();
    });

    const exec = () => {
      return request(server)
        .del("/api/users/" + _id)
        .send({ name: "Update" })
        .set("Authorization", `Bearer ${token}`);
    };
    it("should return 400. Invalid user id", async () => {
      _id = 1;
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("Should return 401. If user have invalid token", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty("error");
    });
    it("Should return 401. If user have not found", async () => {
      _id = mongoose.Types.ObjectId();
      const res = await exec();
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty("error");
    });

    it("Should return 403. If User is not authorized for delete the resource ", async () => {
      const newUser = await await userModel.User.create({
        name: "New User",
        email: "newUser@test.com",
        password: "1234567",
      });
      _id = newUser._id;
      const res = await exec();
      expect(res.status).toBe(403);
      expect(res.body).toHaveProperty("error");
    });
    it("Should return 200. If user delete successfully", async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(Object.keys(res.body)).toEqual(
        expect.arrayContaining(["name", "email", , "create", "_id"])
      );
    });
  });
});
