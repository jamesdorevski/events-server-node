import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergedTypeDefs } from "./types/index";
import { mergedResolvers } from "./resolvers/index";

export const schema = makeExecutableSchema({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolvers,
});
