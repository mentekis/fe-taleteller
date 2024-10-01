import { z } from "zod";
import { passwordValidationPattern } from "../utils/password-validation";
import jsonFetcher from "@/lib/fetch";

export const registerSchema = z.object({
    username: z
        .string({ message: "Please input your name, ok?" })
        .min(3, { message: "Name at least 3 characters" }),
    email: z
        .string({ message: "Please input your email, ok?" })
        .email({ message: "Use valid email" }),
    password: z
        .string({ message: "Please input your password" })
        .min(8, { message: "Password at least 8 characters" })
        .regex(passwordValidationPattern, {
            message:
                "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
        }),
});

export type TRegister = z.infer<typeof registerSchema>;

export const submitRegister = async (data: TRegister) => {
    console.info(data);

    try {
        // TODO: Implement register
        await jsonFetcher("/auth/register", data, {
            method: "POST",
        });
    } catch (error) {
        console.warn(error);
        throw new Error("Something went wrongss");
    }
}