import {useState, createContext, useContext, useEffect} from "react";
import {I18nProvider} from "@lingui/react";
import {i18n} from "@lingui/core";

import {
    availableLocales as defaultAvailableLocales,
    defaultLocale,
} from "base/i18n/config/i18nConfig";

import {appDefaultLocale} from "app/l10n/localizationConfig";

import {dynamicActivate} from "./i18nLinguiConfig";
import {LocaleService} from ".";

let LinguiI18NContext = createContext(null);

export default function Lingui18NProvider({
    availableLocales: customAvailableLocales = null,
    children,
}) {
    const [selectedLocale, setSelectedLocaleInternal] = useState(null);
    const availableLocales = defaultAvailableLocales || customAvailableLocales;

    useEffect(() => {
        if (selectedLocale) {
            dynamicActivate(selectedLocale);
        } else {
            const storedLocale = LocaleService.getStoredLocale();
            setSelectedLocale(storedLocale || appDefaultLocale || defaultLocale);
        }
    }, [selectedLocale]);

    const setSelectedLocale = selectedLocale => {
        LocaleService.storeLocale(selectedLocale);
        setSelectedLocaleInternal(selectedLocale);
    };

    let value = {selectedLocale, setSelectedLocale, availableLocales};

    return (
        selectedLocale && (
            <LinguiI18NContext.Provider value={value}>
                <I18nProvider i18n={i18n}>{children}</I18nProvider>
            </LinguiI18NContext.Provider>
        )
    );
}

function useLinguiI18N() {
    return useContext(LinguiI18NContext);
}

export {useLinguiI18N};
