import { FastifyRequest } from "fastify";

export type GraphQLContext = {};

export async function contextFactory(req: FastifyRequest): Promise<GraphQLContext> {
    return {};
}
