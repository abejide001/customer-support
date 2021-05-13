import mongoose from "mongoose";
import request from "supertest";
import app from "../../../../app";

it("returns a 401 if user is not authorized", async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  await request(app)
    .patch(`/api/v1/tickets/process/${id}`)
    .send({
      state: "in-review",
    })
    .expect(401);
});

it("returns a 403 if the user is not an agent", async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  await request(app)
    .patch(`/api/v1/tickets/process/${id}`)
    .set("Authorization", `Bearer ${global.customerSignIn()}`)
    .send({
      state: "in-review",
    })
    .expect(403);
});

it("returns a 404 if the user is an agent and ticket does not exist", async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  const response = await request(app)
    .patch(`/api/v1/tickets/process/${id}`)
    .set("Authorization", `Bearer ${global.agentSignIn()}`)
    .send({
      state: "in-review",
    });
  expect(response.status).toEqual(404);
});

it("returns a 500 if it is not a valid state", async () => {
  const response = await request(app)
    .post("/api/v1/tickets")
    .set("Authorization", `Bearer ${global.customerSignIn()}`)
    .send({ title: "recharge", description: "I cant recharge" });
  await request(app)
    .patch(`/api/v1/tickets/process/${response.body.data.id}`)
    .set("Authorization", `Bearer ${global.agentSignIn()}`)
    .send({
      state: "hmmm",
    })
    .expect(500);
});

it("returns a 200 and updates the ticket if the ticket id is valid", async () => {
  const response = await request(app)
    .post("/api/v1/tickets")
    .set("Authorization", `Bearer ${global.customerSignIn()}`)
    .send({ title: "recharge", description: "I cant recharge" });
  await request(app)
    .patch(`/api/v1/tickets/process/${response.body.data.id}`)
    .set("Authorization", `Bearer ${global.agentSignIn()}`)
    .send({
      state: "in-review",
    })
    .expect(200);
});
