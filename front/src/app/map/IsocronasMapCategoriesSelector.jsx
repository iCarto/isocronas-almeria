import {useEffect, createElement} from "react";
import {theme} from "Theme";

import {useDomainContext} from "base/domain/provider";
import {useMapContext} from "base/map";
import styled from "@mui/material/styles/styled";

import {usePoiCategoryUtil} from "poi/utils";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import {usePoisIsochroneContext} from "poi/map";

const CategoryButton = styled(IconButton)(({theme, selected, categoryColor}) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    width: "100%",
    height: "100%",
    color: selected ? categoryColor : theme.palette.action.disabled,
    "&:hover": {
        backgroundColor: theme.palette.action.hover,
    },
    transition: "all 0.3s ease",
}));

const IsocronasMapCategoriesSelector = ({}) => {
    const {mapFilter, updateMapFilter} = useMapContext();

    const {selectedCategories, setSelectedCategories, elements} =
        usePoisIsochroneContext();

    const {domains} = useDomainContext();

    const {getStyleForCategory} = usePoiCategoryUtil();

    useEffect(() => {
        if (mapFilter?.category) {
            const categories = Array.isArray(mapFilter.category)
                ? mapFilter.category
                : mapFilter.category.split(",").map(cat => cat.trim());

            setSelectedCategories(categories);
        }
    }, [domains]);

    const handleToggleCategory = category => {
        setSelectedCategories(prev => {
            let newState;
            if (prev.includes(category)) {
                newState = prev.filter(cat => cat !== category);
            } else {
                newState = [...prev, category];
            }
            handleFilterChange(newState);
            return newState;
        });
    };

    const handleFilterChange = newSelection => {
        console.log("Categorías activas:", newSelection);
        updateMapFilter({category: newSelection});
    };

    const getElementsNumberForCategory = category => {
        if (!elements) {
            return 0;
        }
        return elements.filter(feature => feature.properties.category === category)
            .length;
    };

    return (
        <Grid
            container
            alignItems="flex-start"
            columnSpacing={1}
            px={2}
            py={0.5}
            sx={{
                maxHeight: "35%",
                overflowY: "auto",
                borderBottom: `1px solid ${theme.palette.secondary.light}`,
            }}
        >
            {domains?.poi_category_group.map(category => {
                const isSelected = selectedCategories.includes(category.value);
                const categoryIcon = getStyleForCategory(category.value).icon;
                const categoryColor = getStyleForCategory(category.value).color;

                return (
                    <Grid item xs={4} xl={3} key={category.value}>
                        <CategoryButton
                            selected={isSelected}
                            categoryColor={categoryColor}
                            onClick={() => handleToggleCategory(category.value)}
                            key={category.value}
                        >
                            <Badge
                                badgeContent={
                                    getElementsNumberForCategory(category.value) || 0
                                }
                                sx={{
                                    "& .MuiBadge-badge": {
                                        color: "white",
                                        backgroundColor: categoryColor,
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        mb: 1,
                                        p: 1,
                                        pb: 0.5,
                                        border: `1px solid ${isSelected ? categoryColor : theme.palette.secondary.light}`,
                                        borderRadius: 2,
                                    }}
                                >
                                    {createElement(categoryIcon)}
                                </Box>
                            </Badge>
                            <Typography
                                variant="caption"
                                align="center"
                                lineHeight={1}
                                sx={{
                                    fontWeight: isSelected ? "medium" : "normal",
                                }}
                            >
                                {category.label}
                            </Typography>
                        </CategoryButton>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default IsocronasMapCategoriesSelector;
