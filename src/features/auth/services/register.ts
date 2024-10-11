import { z } from "zod";
import { passwordValidationPattern } from "../utils/password-validation";
import jsonFetcher from "@/lib/fetch";

export const registerSchema = z.object({
    name: z
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
    passwordConfirmation: z.string({
        message: "Please confirm the password"
    }),
})
    .refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords don't match",
        path: ["passwordConfirmation"],
    });

export type TRegister = z.infer<typeof registerSchema>;

export const submitRegister = async (data: TRegister) => {
    const result = await jsonFetcher("/auth/register", data, {
        method: "POST",
    });

    return result;
}