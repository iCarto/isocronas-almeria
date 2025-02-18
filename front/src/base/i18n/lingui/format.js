import {i18n} from "@lingui/core";

export function formatDateWithLocale(date, formatOptions = {}) {
    return i18n.date(date, formatOptions);
}

export function formatNumberWithLocale(value, formatOptions = {}) {
    return i18n.number(value, formatOptions);
}
