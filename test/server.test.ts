import { Server } from "@hapi/hapi";
import Code from "@hapi/code";
import Lab from "@hapi/lab";
import { deployment } from "../server";
import Manifest from "../server/manifest";

const manifest = Manifest.get("/", process.env);
const { describe, it, before } = (exports.lab = Lab.script());
const { expect } = Code;

describe("Server Tests", () => {
  let server: Server;

  before(async () => {
    server = await deployment({ start: true });
  });

  it("successfully start server", async () => {
    expect(server.type).to.equal("tcp");
    expect(server.settings.port).to.equal(manifest.server.port);
    expect(["0.0.0.0", "localhost"]).to.include(server.settings.host);
  });
});
