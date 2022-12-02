import fastify from "fastify";
import autoLoad from "@fastify/autoload";
// import userRouter from "./routes/user.route";
import fastifyHelmet from "@fastify/helmet";
import fastifyCors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import { join } from "path";
import httpStatus from "http-status";

const server = fastify();
const prisma = new PrismaClient();
async function main() {
  server.register(autoLoad, {
    dir: join(__dirname, "plugins"),
  });
  server.register(autoLoad, {
    dir: join(__dirname, "routes"),
  });
  server.register(fastifyCors);
  server.register(fastifyHelmet);
  // server.register(userRouter, { prefix: "/api/user" });
  // server.register(loginRoute, { prefix: "/api/v1" });

  server.get("/api/v1", async (request, reply) => {
    reply.status(httpStatus.OK).send({ message: "Hello World!" });
  });

  server.listen({ port: 4000, host: "0.0.0.0" }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
