import { Server } from "@hapi/hapi";
import Code from "@hapi/code";
import Lab from "@hapi/lab";
import { deployment } from "../server";
import { users } from "../lib/routes/user";

interface User {
  id: number;
  name: string;
}

interface InvalidOutput {
  statusCode: number;
  error: string;
  message: string;
}

const { describe, it, before, after } = (exports.lab = Lab.script());
const { expect } = Code;

describe("Route Test", () => {
  let server: Server;

  before(async () => {
    server = await deployment();
  });

  after(async () => {
    await server.stop();
  });

  it("responds to get requests", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/",
    });
    expect(response.statusCode).to.equal(200);
  });

  it("responds to request for all users", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/user",
    });
    const output = response.result as User[];
    expect(output).to.equal(users);
  });

  it("responds to url query succesfully", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/user?id=2",
    });
    const output = response.result as User;
    expect(output.id).to.equal(2);
  });

  it("responds to url invalid query name", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/user?name=john",
    });
    const output = response.result as InvalidOutput;
    expect(output.statusCode).to.equal(400);
    expect(output.error).to.equal("Bad Request");
    expect(output.message).to.equal("Invalid request query input");
  });

  it("responds to url query with invalid id", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/user?id=10",
    });
    const output = response.result as InvalidOutput;
    expect(output.statusCode).to.equal(404);
    expect(output.error).to.equal("Not Found");
    expect(output.message).to.equal("Invalid ID");
  });

  it("responds to url query with invalid format", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/user?id=12345",
    });
    const output = response.result as InvalidOutput;
    expect(output.statusCode).to.equal(400);
    expect(output.error).to.equal("Bad Request");
    expect(output.message).to.equal("Invalid request query input");
  });

  it("responds to url params succesfully", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/user/2",
    });
    const output = response.result as User;
    expect(output.id).to.equal(2);
  });

  it("responds to url params with invalid id", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/user/10",
    });
    const output = response.result as InvalidOutput;
    expect(output.statusCode).to.equal(404);
    expect(output.error).to.equal("Not Found");
    expect(output.message).to.equal("Invalid ID");
  });

  it("responds to url params with invalid format", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/user/12345",
    });
    const output = response.result as InvalidOutput;
    expect(output.statusCode).to.equal(400);
    expect(output.error).to.equal("Bad Request");
    expect(output.message).to.equal("Invalid request params input");
  });
});
