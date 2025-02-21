import {defineConfig, loadEnv} from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import {lingui} from "@lingui/vite-plugin";

export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd(), "");

    return {
        plugins: [
            react({
                babel: {
                    plugins: ["macros"],
                },
            }),
            lingui(),
            tsconfigPaths(),
        ],
        server: {
            port: 3000,
            proxy: {
                "/geoserver": {
                    target: "http://localhost:8080",
                    changeOrigin: true,
                    secure: false,
                },
            },
        },
        define: {
            "process.env": env,
        },
        build: {manifest: true},
        base: env.mode === "production" ? "/static/" : "/",
        test: {
            globals: true,
            environment: "jsdom",
            setupFiles: "setupTests.js",
        },
    };
});
