import { Server, ServerOptions } from "@hapi/hapi";
import HauteCouture from "@hapipal/haute-couture";
import Package from "../package.json";

exports.plugin = {
  pkg: Package,
  register: async (server: Server, options: ServerOptions) => {
    await HauteCouture.compose(server, options);
  },
};
