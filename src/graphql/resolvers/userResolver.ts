import { hash, compare } from "bcryptjs";
import { sign} from "jsonwebtoken";
import { GraphQLContext } from "../context";
import { authConfig } from "../../libs/auth";

export const userResolver = {
    Query: {
        me: (
            parent: unknown,
            args: object,
            context: GraphQLContext
        ) => {
            if (context.currUser === null) {
                throw new Error("Unauthenticated");
            }
            return context.currUser;
        }
    },
    Mutation: {
        signup: async (
            parent: unknown,
            args: {
                username: string;
                password: string;
            },
            context: GraphQLContext
        ) => {
            if (!context.authenticatedClient) {
                throw new Error("Identify yourself!");
            }

            const password = await hash(args.password, 10);
            const newUser = await context.prisma.user.create({
                data: { ...args, password },
            });
            const token = sign({ userId: newUser.id }, authConfig.JwtSecret, { expiresIn: "1h" });

            return {
                token,
                newUser,
            };
        },
        login: async (
            parent: unknown,
            args: {
                username: string;
                password: string;
            },
            context: GraphQLContext
        ) => {
            const user = await context.prisma.user.findUnique({
                where: {
                    username: args.username
                },
            });
            if (!user) {
                throw new Error(`User ${args.username} not found.`);
            }

            const validPassword = await compare(args.password, user.password);
            // TODO: don't leak this shit
            if (!validPassword) {
                throw new Error("Invalid password");
            }
            
            const token = sign({ userId: user.id }, authConfig.JwtSecret);

            return {
                token,
                user,
            };
        },
    }
};
