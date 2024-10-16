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
import { FrontPageLayout } from "@/features/landing-page/components/layout.front-page";
import { Loader2 } from "lucide-react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import useRegister from "../hooks/useRegister";

export const Register = () => {
    const { form, onSubmit, isError, isLoading } = useRegister();

    return (
        <FrontPageLayout image="/landing-page-taleteller.jpeg">
            <main className="">
                <Helmet>
                    <title>Register to Taleteller</title>
                </Helmet>

                <section className="max-w-[400px] space-y-2 lg:w-[400px]">
                    <h1 className="font-bold">
                        Join the Adventure, Create Your Story!
                    </h1>
                    <h3 className="font-light">
                        Start your magical journey with us today!
                    </h3>

                    {isError && (
                        <p className="text-destructive">
                            Error : {isError.message}
                        </p>
                    )}

                    <Form {...form}>
                        <form
                            className="space-y-4"
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <FormField
                                control={form.control}
                                name="name"
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

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Your secure password
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="passwordConfirmation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Password confirmation
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full rounded-2xl"
                                disabled={isLoading}
                                variant={"primary"}
                            >
                                {isLoading && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Register
                            </Button>
                        </form>
                    </Form>

                    <p className="text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link className="hover:text-black" to={"/auth/login"}>
                            Continue your journey here!
                        </Link>
                    </p>
                </section>
            </main>
        </FrontPageLayout>
    );
};
