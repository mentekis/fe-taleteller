import { Toaster } from "@/components/ui/toaster";
import { AppRouter } from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AppRouter />

            <Toaster />
        </QueryClientProvider>
    );
}

export default App;
