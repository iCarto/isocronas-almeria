const IsocronasUrlParamsConfig = {
    queryParamsEnabled: true,
    params: [
        {
            key: "municipality",
            type: "action",
            scope: ["map"],
        },
        {
            key: "travel_time",
            type: "filter",
            scope: ["map"],
        },
        {
            key: "transport",
            type: "filter",
            scope: ["map"],
        },
        {
            key: "selected_point",
            type: "filter",
            scope: ["map"],
        },
        {
            key: "isochrone",
            type: "filter",
            scope: ["map"],
        },
    ],
};

export default IsocronasUrlParamsConfig;
