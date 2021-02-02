import request from "supertest";
import app from "../../../../app";

it("returns a 400 if the month is not a previous month", async () => {
  const response = await request(app)
    .get(`/api/v1/tickets/${12}`)
    .set("Authorization", `Bearer ${global.agentSignIn()}`)
    .send();
  expect(response.status).toEqual(400);
});

it("returns 200 if it is a previous month", async () => {
  let date = new Date();
  let currentMonth = date.getMonth();
  let previousMonth = new Date(date.setMonth(currentMonth - 1)).getMonth() + 1;
  const response = await request(app)
    .get(`/api/v1/tickets/${previousMonth}`)
    .set("Authorization", `Bearer ${global.agentSignIn()}`)
    .send();
  expect(response.status).toEqual(200);
});
