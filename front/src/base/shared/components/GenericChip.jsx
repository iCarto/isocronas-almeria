import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

const GenericChip = ({
    label,
    icon = null,
    avatarSrc = null,
    avatarText = null,
    tooltipText = "",
    style = {},
}) => {
    return (
        <Tooltip title={tooltipText}>
            <Chip
                avatar={
                    avatarSrc || avatarText ? (
                        avatarSrc ? (
                            <Avatar
                                sx={{backgroundColor: "white", p: 0.4}}
                                src={avatarSrc}
                            />
                        ) : (
                            <Avatar sx={{backgroundColor: "white", fontWeight: "bold"}}>
                                {avatarText}
                            </Avatar>
                        )
                    ) : null
                }
                icon={icon}
                label={label}
                sx={{
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    fontSize: "0.75em",
                    color: "white",
                    ...style,
                }}
            />
        </Tooltip>
    );
};

export default GenericChip;
