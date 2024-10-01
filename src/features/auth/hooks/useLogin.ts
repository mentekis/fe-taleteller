import { useForm } from "react-hook-form";
import { loginSchema, submitLogin, TLogin } from "../services/login";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

export default function useLogin() {
    const form = useForm<TLogin>({
        resolver: zodResolver(loginSchema),
    });

    const mutate = useMutation({
        mutationKey: ["login"],
        mutationFn: async (data: TLogin) => {
            console.info(data);
        }
    });

    function onSubmit(data: TLogin) {
        submitLogin(data);
    }

    return { form, mutate, onSubmit };
}