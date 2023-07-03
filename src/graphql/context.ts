import { FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type GraphQLContext = {
    prisma: PrismaClient;
};

export async function contextFactory(req: FastifyRequest): Promise<GraphQLContext> {
    return {
        prisma,
    };
}
