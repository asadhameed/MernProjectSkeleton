const request = require("supertest");
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
      console.log(res.body);
      expect(Object.keys(res.body[0])).toEqual(
        expect.arrayContaining(["email", "name", "create"])
      );
    });
  });
});
