import fp from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";
import env from "../configs/config";

const jwtDecorator = fp(async (fastify: any, opts) => {
  fastify.register(fastifyJwt, {
    secret: env.JWT_SECRET,
  });

  fastify.decorate("authenticate", async (request: any, reply: any) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
});

export default jwtDecorator;
