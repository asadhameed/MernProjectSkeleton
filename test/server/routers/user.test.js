const request = require("supertest");
import server from "../../../server/server";

describe("User Router", () => {
  beforeEach(async () => {
    // server = await require("../../../server/server");
    //  import server from "../../../server/server";
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
