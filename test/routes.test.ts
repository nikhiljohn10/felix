import { Server } from "@hapi/hapi";
import Code from "@hapi/code";
import Lab from "@hapi/lab";
import { deployment } from "../server";
import { users } from "../lib/routes/user";

interface User {
  id: number;
  name: string;
}

interface Link {
  title: string;
  link: string;
}

type Links = { links: Link[] }

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

  it("responds to root request", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/",
    });
     
    const links = (response.result as Links).links
    expect(response.statusCode).to.equal(200);
    expect(links).to.be.an.array()
    expect(links).to.have.length(4)
  });

  it("responds to root request with undefined base url", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/",
    });
    
    const links: Link[] = (response.result as Links).links
    expect(process.env.BASE_URL).to.be.undefined()
    for (const linkItem of links) {
      expect(linkItem.link).to.startWith("http://localhost")
    }
  });

  it("responds to root request with undefined base url", async () => {
    process.env.BASE_URL = "http://test.localhost"
    const response = await server.inject({
      method: "GET",
      url: "/",
    });
    const links: Link[] = (response.result as Links).links
    expect(process.env.BASE_URL).to.be.equal("http://test.localhost")
    for (const linkItem of links) {
      expect(linkItem.link).to.startWith(process.env.BASE_URL)
    }
  });

  it("responds to request for all users", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/user",
    });
    const output = response.result as User[];
    expect(response.statusCode).to.equal(200);
    expect(output).to.be.an.array()
    expect(output).to.have.length(6)
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
