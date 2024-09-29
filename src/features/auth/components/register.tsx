import {
    Button,
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
} from "@/components/ui";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthLayout } from "./layout.auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

const registerSchema = z.object({
    username: z
        .string({ message: "Please input your name, ok?" })
        .min(3, { message: "Name at least 3 characters" }),
    email: z
        .string({ message: "Please input your email, ok?" })
        .email({ message: "Use valid email" }),
    password: z
        .string({ message: "Please input your password" })
        .min(8, { message: "Password at least 8 characters" })
        .regex(passwordValidation, {
            message:
                "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
        }),
});

export const Register = () => {
    // State
    const [currentData, setCurrentData] = useState<
        z.infer<typeof registerSchema>
    >({
        username: "",
        email: "",
        password: "",
    });

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: currentData,
    });

    const submitRegister = (data: z.infer<typeof registerSchema>) =>
        console.info(data);

    useEffect(() => {
        setTimeout(() => {
            setCurrentData({
                username: "John Doe",
                email: "3yEzy@example.com",
                password: "12345678",
            });
        }, 2000);
    }, []);

    return (
        <AuthLayout>
            <main>
                <Helmet>
                    <title>Login to Taleteller</title>
                </Helmet>

                <section className="w-[400px] max-w-[400px] space-y-2">
                    <h1>Join with us!</h1>

                    <Form {...form}>
                        <form
                            className="space-y-4"
                            onSubmit={form.handleSubmit(submitRegister)}
                        >
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="John Doe"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Your beautiful name
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="coolemail@mail.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Your email address
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">
                                Register
                            </Button>
                        </form>
                    </Form>

                    <p className="text-center text-sm text-muted-foreground">
                        Already joined?{" "}
                        <Link className="hover:text-black" to={"/login"}>
                            Login here!
                        </Link>
                    </p>
                </section>
            </main>
        </AuthLayout>
    );
};
