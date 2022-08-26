import { Server } from "@hapi/hapi";
import Code from "@hapi/code";
import Lab from "@hapi/lab";
import { deployment } from "../server";
import Package from "../package.json";

const { describe, it } = (exports.lab = Lab.script());
const { expect } = Code;

describe("Plugin Test", () => {
  it("registers the main plugin.", async () => {
    const server: Server = await deployment();
    expect(server.registrations).include(Package.name);
  });
});
