import { Login, Register } from "@/features/auth/components";
import { Dashboard } from "@/features/dashboard/components";
import { LandingPage } from "@/features/landing-page/components";
import { StoryCreateForm } from "@/features/stories/create/components";
import { Stages } from "@/features/stories/create/components/stages";
import { Route } from "react-router-dom";
import { BrowserRouter, Routes } from "react-router-dom";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<LandingPage />} path="/" />

                <Route element={<Login />} path="/login" />
                <Route element={<Register />} path="/register" />

                <Route element={<Dashboard />} path="/dashboard" />
                <Route element={<StoryCreateForm />} path="/create-story" />
                <Route
                    element={<Stages />}
                    path="/story/:storyId/stages/:stage"
                />
            </Routes>
        </BrowserRouter>
    );
};
