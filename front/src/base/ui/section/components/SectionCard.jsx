import {SectionTitle} from "base/ui/section/components";
import {ActionsMenu} from "base/ui/menu";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

const SectionCard = ({
    isSidePanelOpen = null,
    showTitleIcon = true,
    subheader = "",
    title = "",
    titleExtras = null,
    secondaryAction = null,
    secondaryActions = null,
    dense = false,
    ...props
}) => {
    const cardStyle = {
        width: "100%",
        height: "100%",
    };

    const cardStyleForSidePanel = {
        overflow: "auto",
        width: {xs: 0, sm: "20%", md: "40%", lg: "68%", xl: "100%"},
    };

    const getActions = () => {
        if (secondaryAction) return secondaryAction;
        if (secondaryActions && secondaryActions.length > 0)
            return <ActionsMenu>{secondaryActions}</ActionsMenu>;
        else return null;
    };

    return (
        <Card
            sx={isSidePanelOpen ? cardStyleForSidePanel : cardStyle}
            component="section"
        >
            {secondaryActions?.length || title ? (
                <CardHeader
                    title={
                        <SectionTitle
                            showTitleIcon={showTitleIcon}
                            titleExtras={titleExtras}
                        >
                            {title}
                        </SectionTitle>
                    }
                    subheader={subheader}
                    action={getActions()}
                    sx={{pb: dense ? 0 : 1}}
                />
            ) : null}
            <CardContent sx={props.contentStyle}>{props.children}</CardContent>
        </Card>
    );
};

export default SectionCard;
