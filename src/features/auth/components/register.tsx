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
import { Loader2 } from "lucide-react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import useRegister from "../hooks/useRegister";
import { AuthLayout } from "./layout.auth";

export const Register = () => {
    const { form, onSubmit, isError, isLoading } = useRegister();

    return (
        <AuthLayout>
            <main>
                <Helmet>
                    <title>Login to Taleteller</title>
                </Helmet>

                <section className="w-[400px] max-w-[400px] space-y-2">
                    <h1>Join with us!</h1>

                    {isError && (
                        <p className="text-destructive">{isError.message}</p>
                    )}

                    <Form {...form}>
                        <form
                            className="space-y-4"
                            onSubmit={form.handleSubmit(onSubmit)}
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
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isLoading}
                            >
                                {isLoading && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
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
