import { hash } from "bcryptjs";
import { sign} from "jsonwebtoken";
import { GraphQLContext } from "../context";
import "dotenv/config";

export const authenticationResolver = {
    Mutation: {
        signup: async (
            parent: unknown,
            args: {
                username: string;
                password: string;
            },
            context: GraphQLContext
        ) => {
            const password = await hash(args.password, 10);
            const newUser = await context.prisma.user.create({
                data: { ...args, password },
            });
            const token = sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

            return {
                token,
                newUser,
            };
        },
    }
};
