import {defineConfig, loadEnv} from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import {lingui} from "@lingui/vite-plugin";
import {sentryVitePlugin} from "@sentry/vite-plugin";

export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd(), "REACT_APP_");
    console.log(process.cwd());
    console.log("Mode:", mode);
    console.log("SENTRY_AUTH_TOKEN:", env.REACT_APP_SENTRY_AUTH_TOKEN);
    console.log("All env vars:", env);

    return {
        plugins: [
            react({
                babel: {
                    plugins: ["macros"],
                },
            }),
            lingui(),
            tsconfigPaths(),
            sentryVitePlugin({
                authToken: env.REACT_APP_SENTRY_AUTH_TOKEN,
                org: "icarto",
                project: "isocronas",
            }),
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
        build: {manifest: true, sourcemap: true},
        base: env.mode === "production" ? "/static/" : "/",
        test: {
            globals: true,
            environment: "jsdom",
            setupFiles: "setupTests.js",
        },
    };
});
