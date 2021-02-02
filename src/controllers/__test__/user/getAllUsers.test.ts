import request from "supertest";
import app from "../../../../app";

it("returns a list os users if the current user is an admin", async () => {
  const response = await request(app)
    .get(`/api/v1/users`)
    .set("Authorization", `Bearer ${global.adminSignIn()}`)
  expect(response.status).toEqual(200);
});

it("returns a 403 if current user is not an admin", async () => {
  const response = await request(app)
    .get(`/api/v1/users`)
    .set("Authorization", `Bearer ${global.customerSignIn()}`)
  expect(response.status).toEqual(403);
});