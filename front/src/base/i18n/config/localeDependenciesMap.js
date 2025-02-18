import {ptPT, esES} from "@mui/material/locale";
import {ptBR as muiDatePtBR, esES as muiDateEsES} from "@mui/x-date-pickers/locales";
import enLocale from "date-fns/locale/en-GB";
import esLocale from "date-fns/locale/es";
import ptLocale from "date-fns/locale/pt-BR";

// Note: MUI Date pickers only support Brazilian Portuguese for now

export const localeDependenciesMap = {
    // Locale for Eswatini
    "en-SZ": {
        muiLocale: {},
        muiDateLocale: {},
        dateFnsLocale: enLocale,
        currencyCode: "SZL", // Lilangeni
    },
    "es-ES": {
        muiLocale: esES,
        muiDateLocale: muiDateEsES,
        dateFnsLocale: esLocale,
        currencyCode: "EUR",
    },
    // Locale for Mozambique
    "pt-MZ": {
        muiLocale: ptPT,
        muiDateLocale: muiDatePtBR,
        dateFnsLocale: ptLocale,
        currencyCode: "MZN", // Metical
    },
    // Locale for São Tomé e Príncipe
    "pt-ST": {
        muiLocale: ptPT,
        muiDateLocale: muiDatePtBR,
        dateFnsLocale: ptLocale,
        currencyCode: "STN", // Dobra
    },
    // Locale for testing
    "pseudo-LOCALE": {
        muiLocale: {},
        muiDateLocale: {},
        dateFnsLocale: enLocale,
        currencyCode: "USD",
    },
};
