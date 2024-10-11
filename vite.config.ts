import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    preview: {
        port: 3334,
        strictPort: true,
    },
    server: {
        port: 3333,
        strictPort: true,
        host: true,
        origin: "http://0.0.0.0:8080",
    },
});
