import {createContext, useState, useEffect} from "react";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import {MuiLocalizationProvider} from "base/i18n/mui/provider";
import {useLinguiI18N} from "base/i18n/lingui/Lingui18NProvider";
import {defaultLocale} from "base/i18n/config/i18nConfig";

import {getTheme} from "Theme";

const MuiI18nContext = createContext(null);

const MuiI18nProvider = ({children}) => {
    const {selectedLocale} = useLinguiI18N();
    const [theme, setTheme] = useState(getTheme(selectedLocale || defaultLocale));

    useEffect(() => {
        setTheme(getTheme(selectedLocale || defaultLocale));
    }, [selectedLocale]);

    return (
        <MuiI18nContext.Provider value={theme}>
            <MuiLocalizationProvider locale={selectedLocale || defaultLocale}>
                <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </MuiLocalizationProvider>
        </MuiI18nContext.Provider>
    );
};

export default MuiI18nProvider;
