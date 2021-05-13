import request from "supertest";
import app from "../../../../app";
import Ticket from "../../../models/Ticket";

it("returns 200 if the route exist", async () => {
  const response = await request(app).post("/api/v1/tickets").send({});
  expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
  await request(app).post("/api/v1/tickets").send({}).expect(401);
});

it("returns a status other than 401 if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/v1/tickets")
    .set("Authorization", `Bearer ${global.customerSignIn()}`)
    .send({});
  expect(response.status).not.toEqual(401);
});

it("returns a 500 if the token is invalid", async () => {
  const response = await request(app)
    .post("/api/v1/tickets")
    .set("Authorization", `Bearer invalidtokenishereerejsbfjf`)
    .send({});
  expect(response.status).toEqual(500);
});

it("returns 403 if it is not a customer that is trying to create a ticket", async () => {
  const response = await request(app)
    .post("/api/v1/tickets")
    .set("Authorization", `Bearer ${global.agentSignIn()}`)
    .send({});
  expect(response.status).toEqual(403);
});

it("returns 422 if the description is less than 10", async () => {
  await request(app)
    .post("/api/v1/tickets")
    .set("Authorization", `Bearer ${global.customerSignIn()}`)
    .send({ description: "a" })
    .expect(422);
});

it("creates a ticket with valid inputs", async () => {
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  const description = "I cant subscribe";
  const title = "Subscription"
  await request(app)
    .post("/api/v1/tickets")
    .set("Authorization", `Bearer ${global.customerSignIn()}`)
    .send({
      description,
      title
    })
    .expect(201);
  tickets = await Ticket.find({});
  expect(tickets[0].description).toEqual(description);
  expect(tickets[0].state).toEqual("pending");
});
