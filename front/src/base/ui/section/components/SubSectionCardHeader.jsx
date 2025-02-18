import {cloneElement} from "react";
import {ActionsMenu} from "base/ui/menu";

import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography/Typography";

const SubSectionCardHeader = ({
    titleLabel = "",
    titleValue = "",
    icon = null,
    actions = null,
}) => {
    const titleIcon = cloneElement(icon, {
        sx: {color: "grey", fontSize: "18px"},
    });
    return (
        <CardHeader
            action={<ActionsMenu>{actions}</ActionsMenu>}
            title={
                <Stack direction="row" alignItems="center" spacing={1}>
                    {titleIcon}
                    {titleLabel ? (
                        <Typography color="grey">{titleLabel}:</Typography>
                    ) : null}
                    <Typography
                        color="primary.dark"
                        sx={{
                            textTransform: "uppercase",
                            fontWeight: "bold",
                        }}
                    >
                        {titleValue}
                    </Typography>
                </Stack>
            }
            sx={{bgcolor: "grey.50", borderBottom: 1, borderColor: "grey.200"}}
        />
    );
};

export default SubSectionCardHeader;
