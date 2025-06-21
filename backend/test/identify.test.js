const request = require("supertest");
const app = require("../src/index"); // assuming index.js is in src/

describe("POST /identify", () => {
  it("should create a new contact", async () => {
    const res = await request(app)
      .post("/identify")
      .send({
        email: "test@moonrider.org",
        phoneNumber: "1234567890"
      })
      .set("Content-Type", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("contact");
    expect(res.body.contact).toHaveProperty("primaryContactId");
  });
});
