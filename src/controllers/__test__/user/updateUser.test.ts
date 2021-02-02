import mongoose from "mongoose";
import request from "supertest";
import app from "../../../../app";

it("returns a 401 if user is not authorized", async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  await request(app).patch(`/api/v1/users/${id}`).send().expect(401);
});

it("returns a 404 if the id is invalid", async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  await request(app).patch(`/api/v1/tickets/users/${id}`).send().expect(404);
});

it("returns a 403 if the user is not an admin", async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  await request(app)
    .patch(`/api/v1/users/${id}`)
    .set("Authorization", `Bearer ${global.customerSignIn()}`)
    .send()
    .expect(403);
});

it("returns a 404 if the user is an admin and a customer does not exist", async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  const response = await request(app)
    .patch(`/api/v1/users/${id}`)
    .set("Authorization", `Bearer ${global.adminSignIn()}`)
    .send();
  expect(response.status).toEqual(404);
});

it("returns a 500 if it is not a valid role", async () => {
  const response = await request(app)
    .post("/api/v1/auth/signup")
    .send({ email: "adem@gmail.com", password: "abcde" });
  await request(app)
    .patch(`/api/v1/users/${response.body.data.id}`)
    .set("Authorization", `Bearer ${global.adminSignIn()}`)
    .send({
      role: "hmmm",
    })
    .expect(500);
});

it("returns a 200 and updates the user role", async () => {
  const response = await request(app)
    .post("/api/v1/auth/signup")
    .send({ email: "adem@gmail.com", password: "abcde" });
  await request(app)
    .patch(`/api/v1/users/${response.body.data.user.id}`)
    .set("Authorization", `Bearer ${global.adminSignIn()}`)
    .send({
      role: "agent",
    })
    .expect(200);
});
