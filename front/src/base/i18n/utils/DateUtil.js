import {format, parse, add, addDays, differenceInCalendarMonths} from "date-fns";

import {useLinguiI18N} from "base/i18n/lingui";
import {DATE_FORMAT_OPTIONS} from "base/i18n/config/formattingConfig";
import {formatDateWithLocale} from "base/i18n/lingui/format";
import {localeDependenciesMap} from "base/i18n/config/localeDependenciesMap";
import {TextUtil} from "base/format/utilities";

function useDateUtil() {
    const {selectedLocale} = useLinguiI18N();

    const formatDate = (dateValue, formatOptions) => {
        if (!dateValue || isInvalidDateObject(dateValue)) return "";

        const date = new Date(dateValue);
        return formatDateWithLocale(date, formatOptions);
    };

    const formatDateTime = date =>
        formatDate(date, DATE_FORMAT_OPTIONS.CLIENT_DATETIME);

    const formatTime = date => formatDate(date, DATE_FORMAT_OPTIONS.CLIENT_TIME);

    const formatDateMonth = date =>
        formatDate(date, DATE_FORMAT_OPTIONS.CLIENT_DATEMONTH);

    const formatDateForAPI = date => format(date, DATE_FORMAT_OPTIONS.API_DATE);

    const formatDateTimeForFilename = date =>
        format(date, DATE_FORMAT_OPTIONS.FILENAME_DATETIME);

    const formatHoursAndMinutes = millis => {
        return (
            Math.trunc(millis / 3600000) +
            " h " +
            Math.trunc((millis / 60000) % 60) +
            " min"
        );
    };

    const formatYearAndMonth = date => {
        const month = `${new Date(date).getMonth() + 1}`.padStart(2, "0");
        return `${month}-${new Date(date).getFullYear()}`;
    };

    const parseDate = date => {
        return parse(date, DATE_FORMAT_OPTIONS.API_DATE, new Date());
    };

    const addMonths = (date, months) => add(new Date(date), {months});

    const getToday = () => {
        const now = new Date(Date.now());
        now.setHours(0, 0, 0, 0);
        return now;
    };

    const getDayInDate = date => formatDate(date, {day: "numeric"});

    const getMonthInDate = (date, formatType = "name") => {
        const monthDate = new Date(date);
        const formatStr = formatType === "name" ? "LLLL" : "LLL";
        return TextUtil.capitalize(
            format(monthDate, formatStr, {
                locale: localeDependenciesMap[selectedLocale],
            })
        );
    };

    const getYearInDate = date => formatDate(date, {year: "numeric"});

    const getDateAfterDays = (date, amountOfDays) => {
        return addDays(parseDate(date), amountOfDays);
    };

    const getMonthsInPeriod = (firstDate, lastDate) => {
        return differenceInCalendarMonths(new Date(lastDate), new Date(firstDate));
    };

    const getFirstDayOfCurrentMonth = () => {
        const today = getToday();
        today.setDate(1);
        return today;
    };

    const isInvalidDateObject = dateValue => {
        // https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript
        // Careful: if date is not a Date Object it returns false
        if (
            dateValue === "Invalid Date" ||
            Object.prototype.toString.call(dateValue) === "[object Date]"
        ) {
            return isNaN(dateValue);
        }
        return false;
    };

    return {
        formatDate,
        formatDateForAPI,
        formatDateMonth,
        formatDateTime,
        formatDateTimeForFilename,
        formatTime,
        formatHoursAndMinutes,
        formatYearAndMonth,
        parseDate,
        addMonths,
        getToday,
        getDayInDate,
        getMonthInDate,
        getYearInDate,
        getDateAfterDays,
        getMonthsInPeriod,
        getFirstDayOfCurrentMonth,
        isInvalidDateObject,
    };
}

export {useDateUtil};
