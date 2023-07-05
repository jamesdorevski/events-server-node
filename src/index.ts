import "graphql-import-node";
import { Request, shouldRenderGraphiQL, getGraphQLParameters, processRequest, sendResult, renderGraphiQL } from "graphql-helix";
import { schema } from "./graphql/schema";
import fastify from "fastify";
import { contextFactory } from "./graphql/context";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {

    const envToLogger = {
        development: {
            transport: {
                target: "pino-pretty",
                options: {
                    translateTime: "HH:MM:ss Z",
                    ignore: "pid, hostname",
                },
            },
        },
    };

    const server = fastify({
        logger: envToLogger["development"] ?? true,
    });

    server.route({
        method: ["POST", "GET"],
        url: "/graphql",
        handler: async (req, resp) => {
            const request: Request = {
                headers: req.headers,
                method: req.method,
                query: req.query,
                body: req.body
            };
            
            if (shouldRenderGraphiQL(request)) {
                resp.header("Content-Type", "text/html");
                resp.send(
                    renderGraphiQL({
                        endpoint: "/graphql",
                    })
                );

                return;
            }

            const { operationName, query, variables } = getGraphQLParameters(request);
            
            req.log.info({
                operationName: operationName,
                query: query,
                headers: req.headers,
                variables: variables,
            }, "Received GraphQL request");

            const result = await processRequest({
                request,
                schema, 
                operationName,
                contextFactory: () => contextFactory(req),
                query,
                variables,
            });

            if (result.type === "RESPONSE") {
                req.log.info({
                    data: result.payload.data,
                    errors: result.payload.errors,
                }, "Sending GraphQL response");   
            }

            sendResult(result, resp.raw);
        }
    });

    server.listen({ port: 8080, host: "0.0.0.0"}, () => {
        console.log("Server is running on http://localhost:8080/");
    });
}

main();
