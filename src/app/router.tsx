import { Login, Register } from "@/features/auth/components";
import { Dashboard } from "@/features/dashboard/components";
import { Explore } from "@/features/dashboard/components/explore";
import { UserStories } from "@/features/dashboard/components/user-stories";
import { NoMatch } from "@/features/error/not-found.error";
import { LandingPage } from "@/features/landing-page/components";
import { StoryCreateForm } from "@/features/stories/create/components";
import { Stages } from "@/features/stories/create/components/stages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<NoMatch />} path="*" />

                <Route element={<LandingPage />} path="/" />

                <Route element={<Login />} path="/auth/login" />
                <Route element={<Register />} path="/auth/register" />

                <Route element={<Dashboard />} path="/dashboard" />
                <Route element={<Explore />} path="/explore" />
                <Route element={<UserStories />} path="/user-stories" />
                <Route element={<StoryCreateForm />} path="/create-story" />
                <Route element={<Stages />} path="/story/:storyId/stages" />
            </Routes>
        </BrowserRouter>
    );
};
