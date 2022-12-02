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

/**
 * Force Change Password Route
 */

const chPasswordRoute = async (fastify: FastifyInstance) => {
  fastify.route({
    method: "POST",
    url: "/change-password",
    handler: chPassword,
  });
};

const routeArray = [loginRoute];

export default fp(async (fastify: FastifyInstance) => {
  routeArray.forEach((route) => {
    fastify.register(route, { prefix: "/api/v1" });
  });
});
