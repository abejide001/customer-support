import request from "supertest";
import app from "../../../../app";

it("returns a 200 if the user is an agent", async () => {
  const response = await request(app)
    .get(`/api/v1/tickets/process`)
    .set("Authorization", `Bearer ${global.agentSignIn()}`)
  expect(response.status).toEqual(200);
});