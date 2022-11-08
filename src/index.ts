import fastify from "fastify";
import autoLoad from "@fastify/autoload";
// import userRouter from "./routes/user.route";
import formBodyPlugin from "@fastify/formbody";
import fastifyHelmet from "@fastify/helmet";
import fastifyCors from "@fastify/cors";
// import { prisma } from "./helpers/prisma";
import { readFile } from "fs/promises";
import { createReadStream } from "fs";
import { PrismaClient } from "@prisma/client";

const path = require("path");
const server = fastify();
const axios = require("axios");
const FormData = require("form-data");
const prisma = new PrismaClient();
async function main() {
  server.register(autoLoad, {
    dir: path.join(__dirname, "plugins"),
  });
  server.register(formBodyPlugin);
  server.register(fastifyCors);
  server.register(fastifyHelmet);
  // server.register(userRouter, { prefix: "/api/user" });

  //test

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
