import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";

import {defaultLocale} from "base/i18n/config/i18nConfig";
import {localeDependenciesMap} from "base/i18n/config/localeDependenciesMap";

const MuiLocalizationProvider = ({locale = defaultLocale, children}) => {
    // localeText is needed to translate date picker placeholders & other texts --Locale defined in Theme.jsx does not apply on these.
    // adapterLocale is needed for date/time formats.

    const {muiDateLocale, dateFnsLocale} = localeDependenciesMap[locale];

    const customLocaleText =
        muiDateLocale && Object.keys(muiDateLocale).length
            ? muiDateLocale.components.MuiLocalizationProvider.defaultProps.localeText
            : {};

    return (
        <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={dateFnsLocale}
            localeText={customLocaleText}
        >
            {children}
        </LocalizationProvider>
    );
};

export default MuiLocalizationProvider;
