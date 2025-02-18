import {createRoot} from "react-dom/client";
import "./App.css";
import App from "./App";

import * as Sentry from "@sentry/react";
import {captureConsoleIntegration} from "@sentry/react";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);

if (process.env.REACT_APP_SENTRY_DSN) {
    Sentry.init({
        dsn: process.env.REACT_APP_SENTRY_DSN,
        integrations: [
            Sentry.browserTracingIntegration(),
            captureConsoleIntegration({levels: ["warn", "error"]}),
        ],

        // performance
        tracesSampleRate: 0.05,

        // errors
        sampleRate: 1.0,

        //release:
        environment: "production",
    });
}
