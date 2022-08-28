import { Request, ResponseObject, ResponseToolkit } from "@hapi/hapi";
import Manifest from "../../server/manifest";

const manifest = Manifest.get("/", process.env);

let port = manifest.server.port
if (port != undefined) {
  port = port in [80, 443] ? '' : `:${port}`
}

const base_url = process.env.BASE_URL || 'http://localhost'
const url = base_url + port;

const result = {
  links: [
    {
      title: "User list",
      link: url + "/user",
    },
    {
      title: "Find user by query",
      link: url + "/user?id=4",
    },
    {
      title: "Find user by params",
      link: url + "/user/6",
    },
    {
      title: "API Documentation",
      link: url + "/documentation",
    },
  ],
};

export default {
  method: "GET",
  path: "/",
  options: {
    tags: ["api"],
    notes: "Root page",
    handler: (request: Request, h: ResponseToolkit): ResponseObject => {
      return h.response(result);
    },
  },
};
