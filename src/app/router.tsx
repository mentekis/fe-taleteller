import { Login, Register } from "@/features/auth/components";
import { Route } from "react-router-dom";
import { BrowserRouter, Routes } from "react-router-dom";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<div>Front page</div>} path="/" />

                <Route element={<Login />} path="/login" />
                <Route element={<Register />} path="/register" />
            </Routes>
        </BrowserRouter>
    );
};
