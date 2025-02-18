import {theme} from "Theme";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {PageHeaderItem} from ".";

const PageHeader = ({
    primary,
    secondary = null,
    title = null,
    tag = null,
    children = null,
}) => {
    return (
        <Paper
            elevation={0}
            sx={{
                mb: 1,
            }}
        >
            <PageHeaderItem
                primary={primary}
                secondary={secondary}
                title={title}
                tag={tag}
            />
            {children && (
                <Box sx={{bgcolor: theme.palette.menu.secondary.header.background}}>
                    {children}
                </Box>
            )}
        </Paper>
    );
};

export default PageHeader;
