import { PrismaClient, User } from "@prisma/client";
import { FastifyRequest } from "fastify";
import { JwtPayload, verify } from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export const authConfig = {
    JwtSecret: process.env.JWT_SECRET as string,
};

export async function auth(
    prisma: PrismaClient,
    req: FastifyRequest,
): Promise<User | null> {
    if (!req?.headers?.authorization) {
        return null;
    }

    const token = req.headers.authorization.split(" ")[1];
    const tokenPayload = verify(token, authConfig.JwtSecret) as JwtPayload;
    const userId = tokenPayload.userId;

    return await prisma.user.findUnique({
        where: {
            id: userId
        }
    });
}
