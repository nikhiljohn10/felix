import Code from "@hapi/code";
import { Server } from "@hapi/hapi";
import Lab from "@hapi/lab";
import { deployment, manager } from "../server";
import Manifest from "../server/manifest";

const manifest = Manifest.get("/", process.env);
const { describe, it, before, after } = (exports.lab = Lab.script());
const { expect } = Code;

describe("Server Tests", () => {
  let server: Server;

  before(async () => {
    server = await deployment({ start: true });
  });

  after(async () => {
    await manager.stop();
  });

  it("successfully start server at default port", async () => {
    expect(server.type).to.equal("tcp");
    expect(server.settings.port).to.equal(manifest.server.port);
    expect(server.info.host).to.equal("test.localhost");
  });
});
