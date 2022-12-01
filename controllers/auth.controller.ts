import { FastifyRequest, FastifyReply } from "fastify";
import { loginUser } from "../services/auth.service";
import { LoginType } from "../types/auth.type";
import httpStatus = require("http-status");
import { isPasswordMatch } from "../utils/isPasswordMatch";
import excludePassword from "../utils/excludePass";

declare module "fastify" {
  interface FastifyRequest {
    jwtSign: (payload: any) => Promise<string>;
  }
}

/**
 * Login Function
 */

export async function login(request: FastifyRequest, reply: FastifyReply) {
  const data = request.body as LoginType;
  const user = await loginUser(data);

  if (!user) {
    return reply.status(httpStatus.UNAUTHORIZED).send({
      message: "Invalid Credentials",
    });
  }

  const isMatch = await isPasswordMatch(data.password, user.password);

  if (!isMatch) {
    return reply.status(httpStatus.UNAUTHORIZED).send({
      message: "Invalid Credentials",
    });
  }

  const token = await request.jwtSign(user);
  return reply.send({ token, user: excludePassword(user) });
}
