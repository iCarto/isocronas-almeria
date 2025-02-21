import {t} from "@lingui/macro";
import {theme} from "Theme";
import {EntityCard} from "base/entity/components/container";

import Typography from "@mui/material/Typography";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import PublicIcon from "@mui/icons-material/Public";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";

const PoiCard = ({element = null}) => {
    const heading = (
        <>
            <Typography
                variant="h5"
                sx={{
                    display: "inline-block",
                    color: theme.palette.primary.main,
                    marginBottom: 1,
                }}
            >
                {element.properties.name}
            </Typography>
            <Typography
                variant="subtitle2"
                textTransform={"uppercase"}
                mb={1}
                color="grey.700"
            >
                {element.properties.municipality}
            </Typography>
            <Typography variant="body2" lineHeight={1.25} fontWeight={500}>
                {element.properties.category}
            </Typography>
            <Typography variant="body2" lineHeight={1.25}>
                {element.properties.poi_type}
            </Typography>
        </>
    );

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
            icon: <LocalPhoneOutlinedIcon />,
        },
        {
            label: t`Web`,
            property: "web",
            icon: <PublicIcon />,
        },
    ];

    return (
        <EntityCard element={element.properties} heading={heading} fields={fields} />
    );
};
export default PoiCard;
