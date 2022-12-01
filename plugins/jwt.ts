import fp from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";
import env from "../configs/config";
import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";

const jwtDecorator = fp(
  async (fastify: FastifyInstance, opts: FastifyPluginOptions) => {
    fastify.register(fastifyJwt, {
      secret: env.JWT_SECRET,
    });

    fastify.decorate(
      "authenticate",
      async (request: FastifyRequest, reply: FastifyReply) => {
        try {
          await request.jwtVerify();
        } catch (err) {
          reply.send(err);
        }
      }
    );
  }
);

export default jwtDecorator;
