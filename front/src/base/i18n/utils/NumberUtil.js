import {useMemo} from "react";
import {useLinguiI18N} from "base/i18n/lingui";
import {formatNumberWithLocale} from "base/i18n/lingui/format";
import {localeDependenciesMap} from "base/i18n/config/localeDependenciesMap";
import {
    NUMBER_FORMAT_OPTIONS,
    getNumberSeparators,
    getCurrencySymbol,
} from "base/i18n/config/formattingConfig";

function useNumberUtil() {
    const {selectedLocale} = useLinguiI18N();

    const {decimalSeparator, groupSeparator, currencySymbol} = useMemo(() => {
        const {decimalSeparator, groupSeparator} = getNumberSeparators(selectedLocale);
        const currencySymbol = getCurrencySymbol(selectedLocale);

        return {decimalSeparator, groupSeparator, currencySymbol};
    }, [selectedLocale]);

    const formatValue = (value, formatOptions) => {
        if (value === 0 || isNaN(value)) {
            return value;
        }
        if (!value) {
            return "";
        }
        return formatNumberWithLocale(value, formatOptions);
    };

    const formatDecimal = (value, decimalSize = 2) => {
        return formatValue(value, NUMBER_FORMAT_OPTIONS.DECIMAL(decimalSize));
    };

    const formatInteger = value => formatValue(value, NUMBER_FORMAT_OPTIONS.INTEGER);

    const formatCurrency = (value, showCurrencySymbol = true) => {
        if (showCurrencySymbol) {
            const currencyCode = localeDependenciesMap[selectedLocale].currencyCode;
            return formatValue(value, NUMBER_FORMAT_OPTIONS.CURRENCY(currencyCode));
        } else {
            return formatInteger(value);
        }
    };

    const formatMillions = (value, displaySymbol = true) => {
        const absValue = Math.abs(value);
        const valueInMillions = absValue >= 1000000 ? value / 1000000 : value;
        const formattedValue = formatValue(
            valueInMillions,
            NUMBER_FORMAT_OPTIONS.MILLIONS
        );
        return `${formattedValue}${absValue >= 1000000 && displaySymbol ? "M" : ""}`;
    };

    const formatPercentage = (value, total) => {
        const percentage = value / total;
        return formatValue(percentage, NUMBER_FORMAT_OPTIONS.PERCENT);
    };

    const formatKilometersAndMeters = meters =>
        `${Math.trunc(meters / 1000)} km ${meters % 1000} m`;

    const parseNumber = value =>
        typeof value === "string" ? Number(value) : value || 0;

    const parseDecimal = value => {
        if (value && typeof value !== "number") {
            return value.replace(decimalSeparator, ".");
        }
        return value;
    };

    const parseFloat = value => {
        if (value === 0 || value === "") {
            return 0;
        } else if (!value) {
            return NaN;
        } else if (typeof value === "number") {
            return value;
        } else {
            const normalizedValue = value
                .replace(new RegExp(`\\${groupSeparator}`, "g"), "")
                .replace(decimalSeparator, ".");
            const parsedValue = Number(normalizedValue);
            return isNaN(parsedValue) ? NaN : parsedValue;
        }
    };

    const parseInteger = value => {
        if (value === 0 || value === "") return 0;

        const parsedValue = parseInt(value, 10);
        return isNaN(parsedValue) ? "" : parsedValue;
    };

    const cleanDecimal = value => {
        const escapedDecimalSeparator = decimalSeparator.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        );
        const notAllowedCharacters = new RegExp(
            `[^\\d${escapedDecimalSeparator}]`,
            "g"
        );
        let cleanValue = value.replace(notAllowedCharacters, "");
        const hasMultipleSeparators =
            (cleanValue.match(new RegExp(escapedDecimalSeparator, "g")) || []).length >
            1;
        if (hasMultipleSeparators) {
            const lastDecimalSeparatorIndex = cleanValue.lastIndexOf(decimalSeparator);
            cleanValue =
                cleanValue.slice(0, lastDecimalSeparatorIndex) +
                cleanValue.slice(lastDecimalSeparatorIndex + 1);
        }

        if (cleanValue.startsWith(decimalSeparator)) {
            cleanValue = cleanValue.slice(1);
        }
        cleanValue = cleanValue.replace(/^0+(?!$)/, "");

        return cleanValue;
    };

    const cleanInteger = value =>
        typeof value === "string" ? value.replace(/[^0-9]/g, "") : value;

    const getDecimalSize = value => {
        if (value.includes(decimalSeparator)) {
            return value.split(decimalSeparator)[1].length;
        }
        return 0;
    };

    return {
        currencySymbol,
        formatDecimal,
        formatInteger,
        formatCurrency,
        formatMillions,
        formatKilometersAndMeters,
        parseNumber,
        parseDecimal,
        parseFloat,
        parseInteger,
        cleanDecimal,
        cleanInteger,
        formatPercentage,
        getDecimalSize,
    };
}

export {useNumberUtil};
