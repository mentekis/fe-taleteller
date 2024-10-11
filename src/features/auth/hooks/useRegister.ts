import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { registerSchema, submitRegister, TRegister } from "../services/register";
import { useNavigate } from "react-router-dom";

export default function useRegister() {
    const navigate = useNavigate();

    const form = useForm<TRegister>({
        resolver: zodResolver(registerSchema),
    });

    const mutate = useMutation({
        mutationKey: ["register"],
        mutationFn: (data: TRegister) => submitRegister(data),
        onSuccess: () => {
            form.reset();

            navigate("/auth/login");
        },
    });

    function onSubmit(data: TRegister) {
        mutate.mutate(data);
    }

    return {
        form,
        mutate,
        onSubmit,
        isError: mutate.error,
        isSuccess: mutate.data,
        isLoading: mutate.isPending,
    };
}