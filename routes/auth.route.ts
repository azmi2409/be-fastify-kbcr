import { login, chPassword } from "../controllers/auth.controller";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

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

const loginRoute = async (fastify: FastifyInstance) => {
  fastify.route({
    method: "POST",
    url: "/login",
    handler: login,
  });
};

const chPasswordRoute = async (fastify: FastifyInstance) => {
  fastify.route({
    method: "POST",
    url: "/change-password",
    handler: chPassword,
  });
};

export default fp(async (fastify: FastifyInstance) => {
  fastify.register(loginRoute, { prefix: "/api/v1" });
  fastify.register(chPasswordRoute, { prefix: "/api/v1" });
});
