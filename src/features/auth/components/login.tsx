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
import { FormEvent } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { AuthLayout } from "./layout.auth";
import { Link } from "react-router-dom";

export const Login = () => {
    const form = useForm();

    function handleSubmitLogin(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
    }

    return (
        <AuthLayout>
            <main>
                <Helmet>
                    <title>Login to Taleteller</title>
                </Helmet>

                <section className="w-[400px] max-w-[400px] space-y-2">
                    <h1>Login</h1>

                    <Form {...form}>
                        <form
                            className="space-y-4"
                            onSubmit={handleSubmitLogin}
                        >
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
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
                                Login
                            </Button>
                        </form>
                        <Button
                            type="button"
                            className="w-full"
                            variant={"outline"}
                        >
                            Login with Google
                        </Button>
                    </Form>

                    <p className="text-center text-muted-foreground">
                        Not registered yet?{" "}
                        <Link
                            to="/register"
                            className="underline hover:text-black"
                        >
                            Join here!
                        </Link>
                    </p>
                </section>
            </main>
        </AuthLayout>
    );
};
