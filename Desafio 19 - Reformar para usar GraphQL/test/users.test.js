const request = require("supertest")("http://localhost:4000/");

const expect = require("chai").expect;

// TEST SUITE
describe("Tests for RESTFUL API OF USERS", () => {
  describe("Restful verbs of User:", () => {
    it("GET users should return a 200 status with all users", async () => {
      let response = await request.get("api/authentication/users");
      expect(response.status).to.eql(200);
    });
    it("GET user/ID should return a single user and a 200 status", async () => {
      let response = await request.get(
        "api/authentication/users/01a46e1f-8c13-48b0-8787-3ceecd784424"
      );
      expect(response.status).to.eql(200);
    });
    it("PUT should update a property from a user and return a 200 status", async () => {
      const newData = {
        color: "coral",
      };
      let response = await request
        .put("api/authentication/users/2cd9c1b2-8228-48a3-b30c-1977ef7024cd")
        .send(newData);
      expect(response.status).to.eql(200);
    });
    it("Delete, should delete a user from the DB", async () => {
      let response = await request.delete(
        "api/authentication/users/e772bb9b-f700-4b15-a23f-cd684adac335"
      );
      expect(response.status).to.eql(200);
    });
    it("POST, should register a new user and return a 200 status", async () => {
      const newUser = {
        name: "Rahul",
        password: "010203",
        color: "red",
      };
      let response = await request
        .post("api/authentication/register")
        .send(newUser);
      expect(response.status).to.eql(200);
    });
  });
});
