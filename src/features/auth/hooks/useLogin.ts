import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { handleSubmitLogin, loginSchema, TLogin } from "../services/login";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
    // Hooks
    const navigate = useNavigate();

    const form = useForm<TLogin>({
        resolver: zodResolver(loginSchema),
    });

    const { mutate: submitLogin, isError, isPending, isSuccess } = useMutation({
        mutationKey: ["login"],
        mutationFn: (data: TLogin) => handleSubmitLogin(data)
    });

    function onSubmit(data: TLogin) {
        submitLogin(data);
    }

    // If successful, redirect to home
    if (isSuccess) {
        navigate("/register");
    }

    return { form, onSubmit, isError, isLoading: isPending, isSuccess };
}