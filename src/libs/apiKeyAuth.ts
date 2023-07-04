import { FastifyRequest } from "fastify";

export function apiKeyAuth(req: FastifyRequest): boolean {
    if (req.headers["x-api-key"] === undefined) {
        return false;
    }

    // TODO: generate keys 
    return req.headers["x-api-key"] === "hi";
}
