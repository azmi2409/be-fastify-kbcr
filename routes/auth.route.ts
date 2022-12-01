import { login } from "../controllers/auth.controller";
import { FastifyInstance } from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    readonly authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }
}

/**
 * Login Route
 */

// const loginRoute = async (fastify: FastifyInstance) => {

// };

export default function (fastify: FastifyInstance) {
  fastify.route({
    method: "POST",
    url: "/login",
    handler: login,
  });
}
