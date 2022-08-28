import { Request, ResponseObject, ResponseToolkit } from "@hapi/hapi";
import Manifest from "../../server/manifest";

const manifest = Manifest.get("/", process.env);

function get_url() {
  const base_url = process.env.BASE_URL || "http://localhost";
  return base_url + ":" + manifest.server.port;
}

export default {
  method: "GET",
  path: "/",
  options: {
    tags: ["api"],
    notes: "Root page",
    handler: (request: Request, h: ResponseToolkit): ResponseObject => {
      return h.response({
        links: [
          {
            title: "User list",
            link: get_url() + "/user",
          },
          {
            title: "Find user by query",
            link: get_url() + "/user?id=4",
          },
          {
            title: "Find user by params",
            link: get_url() + "/user/6",
          },
          {
            title: "API Documentation",
            link: get_url() + "/documentation",
          },
        ],
      });
    },
  },
};
