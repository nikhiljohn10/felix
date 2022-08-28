import { Request, ResponseObject, ResponseToolkit } from "@hapi/hapi";
import Hoek from "@hapi/hoek";
import Joi from "joi";
import Boom from "@hapi/boom";

interface User {
  id: number;
  name: string;
}

const validate_id = Joi.string().min(1).max(4);

export const users: User[] = [
  {
    id: 1,
    name: "john",
  },
  {
    id: 2,
    name: "jack",
  },
  {
    id: 3,
    name: "kate",
  },
  {
    id: 4,
    name: "rob",
  },
  {
    id: 5,
    name: "shan",
  },
  {
    id: 6,
    name: "tom",
  },
];

function get_user(id: number): User {
  const index = users.findIndex((user: User): boolean => user.id == id);
  if (index < 0) {
    throw Boom.notFound("Invalid ID");
  }
  return users[index];
}

export default [
  {
    method: "GET",
    path: "/user",
    options: {
      tags: ["api"],
      notes: "User list or get user by id query",
      handler: (request: Request, h: ResponseToolkit): ResponseObject => {
        if ("id" in request.query) {
          const id: number = +Hoek.escapeHtml(request.query.id);
          const user = get_user(id);
          return h.response(user);
        }
        return h.response(users);
      },
      validate: {
        query: Joi.object({
          id: validate_id,
        }),
      },
    },
  },
  {
    method: "GET",
    path: "/user/{id}",
    options: {
      tags: ["api"],
      notes: "Get user by id",
      handler: (request: Request, h: ResponseToolkit): ResponseObject => {
        const id: number = +Hoek.escapeHtml(request.params.id);
        const user = get_user(id);
        return h.response(user);
      },
      validate: {
        params: Joi.object({
          id: validate_id,
        }),
      },
    },
  },
];
