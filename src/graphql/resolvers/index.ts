import { mergeResolvers } from "@graphql-tools/merge";
import { userResolver } from "./userResolver";

const resolvers = [
    userResolver
];

export const mergedResolvers = mergeResolvers(resolvers);
