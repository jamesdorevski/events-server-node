import { mergeResolvers } from "@graphql-tools/merge";
import { authenticationResolver } from "./authenticationResolver";

const resolvers = [
    authenticationResolver
];

export const mergedResolvers = mergeResolvers(resolvers);
