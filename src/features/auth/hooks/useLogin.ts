import { userAtom } from "@/atom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { handleSubmitLogin, loginSchema, TLogin } from "../services/login";
import Cookies from 'js-cookie';

export default function useLogin() {
    // Hooks
    const navigate = useNavigate();

    const form = useForm<TLogin>({
        resolver: zodResolver(loginSchema),
    });

    const setUserAtom = useSetAtom(userAtom);

    const { mutate: submitLogin, isError, isPending, error } = useMutation({
        mutationKey: ["login"],
        mutationFn: (data: TLogin) => handleSubmitLogin(data),
        onSuccess: (data) => {
            if (data?.accessToken) {
                Cookies.set("accessToken", data.accessToken);

                Cookies.set("refreshToken", data.refreshToken);

                setUserAtom(data.data);

                navigate("/dashboard");
            }
        },
    });

    function onSubmit(data: TLogin) {
        submitLogin(data);
    }

    return { form, onSubmit, isError, isLoading: isPending, error };
}