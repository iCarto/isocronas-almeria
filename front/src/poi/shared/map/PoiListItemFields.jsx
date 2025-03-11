import {t} from "@lingui/macro";

import {TextLink} from "base/navigation/components";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import PublicIcon from "@mui/icons-material/Public";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";

export function usePoiListItemFields() {
    const fields = [
        {
            label: t`Targetted to`,
            property: "people_targetr",
            icon: <AccountBoxOutlinedIcon />,
        },
        {
            label: t`Address`,
            property: "address",
            icon: <FmdGoodOutlinedIcon />,
        },
        {
            label: t`Phone`,
            property: "phone",
            formatFunction: properties => {
                const phone = properties?.phone;
                return phone ? (
                    <TextLink
                        to={`tel:${phone}`}
                        text={phone}
                        textStyle={{fontSize: "0.9rem"}}
                        isExternalLink
                    />
                ) : null;
            },
            icon: <LocalPhoneOutlinedIcon />,
        },
        {
            label: t`Web`,
            property: "web",
            formatFunction: properties => {
                const url = properties?.web;
                return url ? (
                    <TextLink
                        text={url}
                        to={url}
                        textStyle={{fontSize: "0.9rem"}}
                        isExternalLink
                    />
                ) : null;
            },
            icon: <PublicIcon />,
        },
    ];

    return {fields};
}
