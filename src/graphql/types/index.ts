import { mergeTypeDefs } from "@graphql-tools/merge";

import { userType } from "./userType";

const types = [
    userType
];

export const mergedTypeDefs = mergeTypeDefs(types);
