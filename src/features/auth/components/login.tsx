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
import { Loader2 } from "lucide-react";
import { FrontPageLayout } from "@/features/landing-page/components/layout.front-page";

export const Login = () => {
    const { form, onSubmit, isError, isLoading, error } = useLogin();

    return (
        <FrontPageLayout image="/landing-page-taleteller.jpeg">
            <Helmet>
                <title>Login to Taleteller</title>
            </Helmet>

            <section className="max-w-[400px] space-y-2 lg:w-[400px]">
                <h1 className="font-bold">
                    Welcome Back, Ready for a New Adventure?
                </h1>
                <h3 className="font-light">
                    Log in to continue your storytelling journey!
                </h3>

                {isError && <p className="text-red-500">{error?.message}</p>}

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
                        <Button
                            type="submit"
                            className="w-full rounded-2xl"
                            disabled={isLoading}
                            variant={"primary"}
                        >
                            {isLoading && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Login
                        </Button>
                    </form>
                    <Button
                        type="button"
                        className="w-full rounded-2xl"
                        variant={"outline"}
                        disabled={isLoading}
                    >
                        {isLoading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Login with Google
                    </Button>
                </Form>

                <p className="text-center text-muted-foreground">
                    Don’t have an account?{" "}
                    <Link
                        to="/auth/register"
                        className="underline hover:text-black"
                    >
                        Start your adventure now!
                    </Link>
                </p>
            </section>
        </FrontPageLayout>
    );
};
