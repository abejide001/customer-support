import mongoose from "mongoose";
import request from "supertest";
import app from "../../../../app";

it("returns 404 if the ticket does not exist", async () => {
  const ticketId = mongoose.Types.ObjectId().toHexString();
  const response = await request(app)
    .post(`/api/v1/comments/${ticketId}`)
    .set("Authorization", `Bearer ${global.agentSignIn()}`)
    .send({
      comment: "this is",
    });
  expect(response.status).toEqual(404);
});

it("returns 404 if the id is invalid", async () => {
  const response = await request(app)
    .post(`/api/v1/comments/${20}`)
    .set("Authorization", `Bearer ${global.agentSignIn()}`)
    .send({
      comment: "this is",
    });
  expect(response.status).toEqual(404);
});

it("returns a 400 if customer tries to comment first", async () => {
  const response = await request(app)
    .post("/api/v1/tickets")
    .set("Authorization", `Bearer ${global.customerSignIn()}`)
    .send({ title: "recharge", description: "I cant recharge" });
  await request(app)
    .post(`/api/v1/comments/${response.body.data.id}`)
    .set("Authorization", `Bearer ${global.customerSignIn()}`)
    .send({
      comment: "this is still open",
    })
    .expect(400);
});

it("returns a 201 if the agent comments first", async () => {
  const response = await request(app)
    .post("/api/v1/tickets")
    .set("Authorization", `Bearer ${global.customerSignIn()}`)
    .send({ title: "recharge", description: "I cant recharge" });
  await request(app)
    .post(`/api/v1/comments/${response.body.data.id}`)
    .set("Authorization", `Bearer ${global.agentSignIn()}`)
    .send({
      comment: "I am working on this",
    })
    .expect(201);
});

it("returns a 201 if the customer tries to comment after the agent has commented", async () => {
  const response = await request(app)
    .post("/api/v1/tickets")
    .set("Authorization", `Bearer ${global.customerSignIn()}`)
    .send({ title: "recharge", description: "I cant recharge" });
  await request(app)
    .post(`/api/v1/comments/${response.body.data.id}`)
    .set("Authorization", `Bearer ${global.agentSignIn()}`)
    .send({
      comment: "I am working on this",
    });
  await request(app)
    .post(`/api/v1/comments/${response.body.data.id}`)
    .set("Authorization", `Bearer ${global.customerSignIn()}`)
    .send({
      comment: "Please make this faster",
    })
    .expect(201);
});

