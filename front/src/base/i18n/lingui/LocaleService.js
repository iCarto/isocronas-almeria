import {LOCALE} from "base/user/config";
import {Storage} from "base/storage";

const LocaleService = {
    storeLocale(locale) {
        Storage.set(LOCALE, locale);
    },

    getStoredLocale() {
        return Storage.get(LOCALE);
    },
};

export default LocaleService;
