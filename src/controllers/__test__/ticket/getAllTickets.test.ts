import request from "supertest";
import app from "../../../../app";

const createTicket = () => {
  return request(app)
    .post("/api/tickets")
    .set("Authorization", `Bearer ${global.customerSignIn()}`)
    .send({ description: "Cant make orders" });
};
it("can fetch a list of ticket", async () => {
  await createTicket();
  await createTicket();
  await createTicket();

  const response = await request(app)
    .get("/api/v1/tickets")
    .set("Authorization", `Bearer ${global.customerSignIn()}`)
  expect(response.body.message).toEqual("Ticket fetched successfully");
});

it("returns a 401 if user is not authenticated", async () => {
  const response = await request(app)
    .get("/api/v1/tickets")
  expect(response.status).toEqual(401);
});
