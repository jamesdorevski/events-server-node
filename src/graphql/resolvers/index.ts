import { mergeResolvers } from "@graphql-tools/merge";
import { authenticationResolver } from "./authenticationResolver";

export const resolvers = [
    authenticationResolver
];

export const merged = mergeResolvers(resolvers);
