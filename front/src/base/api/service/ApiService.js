import {uploadService} from "base/file/utilities";
import {dataService} from "base/api/utilities";
import {LocaleService} from "base/i18n/lingui";

const ApiService = {
    get(url, headers = {}) {
        console.log("GET", url);
        return dataService.get(url, {
            "Accept-Language": LocaleService.getStoredLocale(),
            ...headers,
        });
    },

    post(url, data, headers = {}) {
        console.log("POST", url, {data});
        return dataService.post(url, data, {
            "Accept-Language": LocaleService.getStoredLocale(),
            ...headers,
        });
    },

    put(url, data, headers = {}) {
        console.log("PUT", url);
        return dataService.put(url, data, {
            "Accept-Language": LocaleService.getStoredLocale(),
            ...headers,
        });
    },

    patch(url, data, bulk = false, headers = {}) {
        console.log("PATCH", url);
        const patchHeaders = {
            "Accept-Language": LocaleService.getStoredLocale(),
            ...headers,
        };
        return dataService.patch(
            url,
            data,
            bulk ? {"X-BULK-OPERATION": true, ...patchHeaders} : {...patchHeaders}
        );
    },

    delete(url, headers = {}) {
        console.log("DELETE", url);
        return dataService.del(url, {
            "Accept-Language": LocaleService.getStoredLocale(),
            ...headers,
        });
    },

    upload(file, url, headers = {}, ...rest) {
        console.log("UPLOAD", url);
        const uploadHeaders = {
            "Accept-Language": LocaleService.getStoredLocale(),
            ...headers,
        };
        return uploadService.upload(
            file,
            url,
            {
                ...uploadHeaders,
                "Content-Disposition": "attachment; filename=" + file.name,
            },
            ...rest
        );
    },
};

export default ApiService;
