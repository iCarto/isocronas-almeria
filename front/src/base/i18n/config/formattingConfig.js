import {localeDependenciesMap} from "./localeDependenciesMap";

// <<----------- Date format options for Intl ---------------->>

// CLIENT_DATEMONTHFORMAT: "MM/yyyy"
const clientDateMonthFormat = {
    year: "numeric",
    month: "2-digit",
};

// CLIENT_DATETIMEFORMAT: "dd/MM/yyyy HH:mm"
const clientDateTimeFormat = {
    dateStyle: "short",
    timeStyle: "short",
};

// CLIENT_TIMEFORMAT: "HH:mm",
const clientTimeFormat = {
    timeStyle: "short",
};

// FILENAME_DATETIMEFORMAT: "yyyyMMddHHmmss"
const filenameDateTimeFormat = "yyyyMMddHHmmss";

// API_DATEFORMAT: "yyyy-MM-dd"
const apiDateFormat = "yyyy-MM-dd";

export const DATE_FORMAT_OPTIONS = {
    CLIENT_DATE: {}, // CLIENT_DATE: "dd/MM/yyyy"
    CLIENT_DATEMONTH: clientDateMonthFormat,
    CLIENT_DATETIME: clientDateTimeFormat,
    CLIENT_TIME: clientTimeFormat,
    FILENAME_DATETIME: filenameDateTimeFormat,
    API_DATE: apiDateFormat,
};
// <<----------- End of Date format options ---------------->>

// <<----------- Number format options for Intl ---------------->>

const integerFormatter = {
    minimumIntegerDigits: 1,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: true,
    // @ts-ignore
    trailingZeroDisplay: "stripIfInteger",
};
const decimalFormatter = (decimalSize = 2) => {
    return {
        minimumIntegerDigits: 1,
        minimumFractionDigits: decimalSize,
        maximumFractionDigits: decimalSize,
        useGrouping: true,
    };
};
const currencyFormatter = currencyCode => {
    return {
        style: "currency",
        currency: currencyCode,
        currencySign: "standard",
        currencyDisplay: "narrowSymbol",
        minimumIntegerDigits: 1,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true,
        // @ts-ignore
        trailingZeroDisplay: "stripIfInteger",
    };
};
const millionFormatter = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
};
const percentFormatter = {
    style: "percent",
};

export const NUMBER_FORMAT_OPTIONS = {
    INTEGER: integerFormatter,
    DECIMAL: decimalFormatter,
    CURRENCY: currencyFormatter,
    MILLIONS: millionFormatter,
    PERCENT: percentFormatter,
};

// <<----------- End of Number format options ---------------->>

// <<----------- Number separators & symbols ---------------->>

export const getNumberSeparators = locale => {
    const numberFormat = new Intl.NumberFormat(locale, {
        style: "decimal",
    });
    const parts = numberFormat.formatToParts(12345.6);

    const decimalSeparator = parts.find(part => part.type === "decimal").value;
    const groupSeparator = parts.find(part => part.type === "group").value;

    return {decimalSeparator, groupSeparator};
};

export const getCurrencySymbol = locale => {
    const currencyCode = localeDependenciesMap[locale]?.currencyCode;
    const numberFormat = new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currencyCode,
    });
    const parts = numberFormat.formatToParts(12345.6);

    return parts.find(part => part.type === "currency")?.value || "";
};

// <<----------- End of Number separators & symbols ---------------->>
