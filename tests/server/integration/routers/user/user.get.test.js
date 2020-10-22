const request = require("supertest");
const mongoose = require("mongoose");
const {
  default: UserModel,
} = require("../../../../../server/models/user.model");
let server;
describe("Get Methods", () => {
  beforeEach(() => {
    server = require("../../../../../server/server").default;
  });
  afterEach(async () => {
    await server.close();
    await UserModel.User.deleteMany({});
  });

  describe("Get User List", () => {
    const exec = () => {
      return request(server).get("/api/users");
    };

    it("Should return 200 and empty list of user. If there is no user", async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
    });
    it("Should return 200 and list of users. If there is user in database", async () => {
      await UserModel.User.create({
        name: "test",
        email: "test@test.com",
        password: "1234567",
      });
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(Object.keys(res.body[0])).toEqual(
        expect.arrayContaining(["email", "name", "create"])
      );
    });
  });
  describe("Get a user By ID", () => {
    let _id;
    let token;
    let user;
    beforeEach(async () => {
      user = await UserModel.User.create({
        name: "test",
        email: "test@test.com",
        password: "1234567",
      });
      _id = user._id;
      token = user.createToken();
    });
    const exec = () => {
      return request(server)
        .get("/api/users/" + _id)
        .set("Authorization", `Bearer ${token} `);
    };
    it("Should return 400. If user id is invalid ", async () => {
      _id = 19;
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
    it("Should return 200. If user is valid", async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(Object.keys(res.body)).toEqual(
        expect.arrayContaining(["email", "name", "_id", "create"])
      );
    });
  });
});
