import Glue from "@hapi/glue";
import Exiting from "exiting";
import Manifest from "./manifest";
import { Server } from "@hapi/hapi";

export let manager: Exiting.Manager<Server>;

interface DeploymentOptions {
  start?: boolean
}

async function deployment({ start }: DeploymentOptions = {}) {
  const manifest = Manifest.get("/", process.env);
  const server = await Glue.compose(manifest, { relativeTo: __dirname });

  if (start) {
    manager = Exiting.createManager(server)
    await manager.start();
    server.log(["start"], `Server started at ${server.info.uri}`);
    return server;
  }

  await server.initialize();

  return server;
}

/* $lab:coverage:off$ */if (require.main === module) {
  deployment({ start: true });
  process.on("unhandledRejection", (err: unknown) => {
    throw err;
  });
}/* $lab:coverage:on$ */

export { deployment };
