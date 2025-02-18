import {t} from "@lingui/macro";

import {AuthService} from "base/api/service";
import {AlertService} from "base/error/service";
import {alertType} from "base/error/model";

export function getImagesData(images) {
    const promises = images.map(image => {
        if (!image) {
            return null;
        }
        return new Promise((resolve, reject) => {
            const img = new Image();

            fetch(image.url, {
                headers: {
                    Authorization: "Bearer " + AuthService.getAccessToken(),
                },
            }).then(res => {
                if (res.ok) {
                    res.blob().then(b => {
                        img.src = URL.createObjectURL(b);
                    });
                } else {
                    console.error(res);
                }
            });

            img.onload = function () {
                const imageData = {
                    url: img.src, // new blob url
                    width: img.width,
                    height: img.height,
                    label: image.label,
                };
                resolve(imageData);
            };
            img.onerror = function () {
                reject(
                    AlertService.createAlertList(
                        alertType.ERROR,
                        t`This image could not be uploaded`,
                        image.url
                    )
                );
            };
        });
    });

    return Promise.all(promises);
}
