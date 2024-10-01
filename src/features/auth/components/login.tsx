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
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { AuthLayout } from "./layout.auth";

export const Login = () => {
    const { form, onSubmit } = useLogin();

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
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <FormField
                                control={form.control}
                                name="email"
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
