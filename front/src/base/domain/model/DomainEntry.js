const createDomainOption = ({value = null, label = null, children = null} = {}) => {
    const publicApi = {
        value,
        label,
        children: children,
    };

    return Object.freeze(publicApi);
};

export default createDomainOption;
