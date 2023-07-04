import { FastifyRequest } from "fastify";
import { PrismaClient, User } from "@prisma/client";
import { auth } from "../auth";
import { apiKeyAuth } from "../apiKeyAuth";

const prisma = new PrismaClient();

export type GraphQLContext = {
    prisma: PrismaClient;
    currUser: User | null;
    authenticatedClient: boolean
};

export async function contextFactory(req: FastifyRequest): Promise<GraphQLContext> {
    return {
        prisma,
        currUser: await auth(prisma, req),
        authenticatedClient: apiKeyAuth(req),
    };
}
