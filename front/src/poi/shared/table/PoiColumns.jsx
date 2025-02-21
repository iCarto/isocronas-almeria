import {t} from "@lingui/macro";

export function usePoisTable() {
    const tableColumns = [
        {
            id: "properties.name",
            label: t`Name`,
        },
        {
            id: "properties.category",
            label: t`Category`,
        },
        {
            id: "properties.people_targetr",
            label: t`Target`,
        },
        {
            id: "properties.municipality",
            label: t`Municipality`,
        },
        {
            id: "properties.address",
            label: t`Address`,
        },
    ];

    return {tableColumns};
}
