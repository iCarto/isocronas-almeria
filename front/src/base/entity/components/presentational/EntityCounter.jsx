import {useEntityListPageContext} from "base/entity/provider";
import {Plural} from "@lingui/macro";

import {useNumberUtil} from "base/i18n/utils";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const EntityCounter = ({label}) => {
    const {size} = useEntityListPageContext();
    const {formatInteger} = useNumberUtil();

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "fit-content",
                px: 1,
                border: 1,
                borderRadius: 1,
                color: "grey.700",
                textTransform: "uppercase",
            }}
        >
            <Typography
                component="span"
                variant="h4"
                sx={{
                    mr: 1,
                }}
            >
                {!size ? 0 : formatInteger(size)}
            </Typography>
            <Typography variant="body1">
                <Plural
                    value={size}
                    one={`${label.singular}`}
                    other={`${label.plural}`}
                />
            </Typography>
        </Box>
    );
};

export default EntityCounter;
