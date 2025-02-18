import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

const IconLabelField = ({icon, label, value, badgeNote = null}) => (
    <Stack direction="row" spacing={1} color="grey.700">
        {badgeNote ? (
            <Tooltip title={label + (badgeNote && ` (${badgeNote})`)}>
                <Badge color="warning" variant="dot">
                    {icon}
                </Badge>
            </Tooltip>
        ) : (
            <Tooltip title={label}>{icon}</Tooltip>
        )}
        <Typography variant="body2">{value}</Typography>
    </Stack>
);

export default IconLabelField;
