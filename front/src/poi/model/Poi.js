const createPoi = ({
    id = null,
    code = null,
    name = null,
    category = null,
    poi_type = null,
    address = null,
} = {}) => {
    const publicApi = {
        id,
        code,
        name,
        category,
        poi_type,
        address,
    };

    return Object.freeze(publicApi);
};

export default createPoi;
