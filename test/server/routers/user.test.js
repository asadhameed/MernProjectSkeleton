const request = require("supertest");
let server;

describe("User Router", () => {
  beforeEach(async () => {
    server = await require("../../../server/server");
  });
  afterEach(async () => {
    await server.close();
  });
  describe("Post User", () => {
    it("Should return 200", async () => {
      const res = await request(server).get("/api/users");
      expect(res.status).toBe(200);
    });
  });
});
