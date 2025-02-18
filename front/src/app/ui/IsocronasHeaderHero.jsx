import {msg} from "@lingui/macro";
import {useLingui} from "@lingui/react";

import {APP_LOGO_PATH, APP_LOGO_URL, APP_NAME_LONG} from "app/l10n/config";
import {HERO_HEIGHT} from "base/ui/baseApp/config/measurements";
import {LogoLink} from "base/navigation/components";
import {HeaderHero} from "base/ui/header";

export const IsocronasHeaderHero = () => {
    const {_} = useLingui();
    const logoHeight = `${HERO_HEIGHT + 12}px`;

    const isocronasLeftLogos = [
        <LogoLink
            key="app_name"
            href="/"
            textLogo={APP_NAME_LONG}
            title={_(msg`Home`)}
            targetBlank={false}
            style={{fontSize: 18, maxWidth: "400px", color: "white"}}
        />,
    ];

    const isocronasRightLogo = [
        <LogoLink
            key="app_logo"
            href={APP_LOGO_URL}
            title={APP_LOGO_URL}
            src={APP_LOGO_PATH}
            alt={_(msg`Logo`)}
            logoHeight={logoHeight}
        />,
    ];

    return (
        <>
            <HeaderHero left={isocronasLeftLogos} right={isocronasRightLogo} />
        </>
    );
};

export default IsocronasHeaderHero;
