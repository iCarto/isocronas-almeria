import CssBaseline from "@mui/material/CssBaseline";

import {Lingui18NProvider} from "base/i18n/lingui";
import {MuiI18nProvider} from "base/i18n/mui/provider";
import {SentryErrorBoundary} from "base/error/sentry";
import {ErrorProvider} from "base/error/provider";

import {IsocronasRoutes} from "app/routes";

function App() {
    return (
        <Lingui18NProvider>
            <MuiI18nProvider>
                <CssBaseline>
                    <SentryErrorBoundary>
                        <ErrorProvider>
                            <div className="App" role="application">
                                <IsocronasRoutes />
                            </div>
                        </ErrorProvider>
                    </SentryErrorBoundary>
                </CssBaseline>
            </MuiI18nProvider>
        </Lingui18NProvider>
    );
}

export default App;
