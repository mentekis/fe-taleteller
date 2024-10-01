import { z } from "zod";
import { passwordValidationPattern } from "../utils/password-validation";
import jsonFetcher from "@/lib/fetch";

export const loginSchema = z.object({
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

export type TLogin = z.infer<typeof loginSchema>;

export const handleSubmitLogin = async (data: TLogin) => {
    try {
        // TODO: implement login
        await jsonFetcher("/auth/login", data, {
            method: "POST",
            credentials: 'include'
        });

    } catch (error) {
        console.warn(error);
        throw new Error("Something wrong with your email or password");
    }
}