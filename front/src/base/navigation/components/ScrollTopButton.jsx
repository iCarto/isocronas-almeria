import {Trans} from "@lingui/macro";
import {useScrollTop} from "../hooks";
import Fab from "@mui/material/Fab";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Tooltip from "@mui/material/Tooltip";

const ScrollTopButton = () => {
    const {showScrollButton, handleScrollTop} = useScrollTop();

    return (
        <Tooltip title={<Trans>Scroll to top</Trans>}>
            <Fab
                color="primary"
                aria-label="scroll-up"
                onClick={handleScrollTop}
                sx={{
                    position: "fixed",
                    bottom: 10,
                    right: 10,
                    display: showScrollButton ? "block" : "none",
                    pt: 1,
                }}
            >
                <ArrowUpwardIcon />
            </Fab>
        </Tooltip>
    );
};

export default ScrollTopButton;
