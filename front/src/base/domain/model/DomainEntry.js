const createDomainOption = ({value = null, label = null, children = null} = {}) => {
    const publicApi = {
        value,
        label,
        children: children ? createDomainEntries(children) : null,
    };

    return Object.freeze(publicApi);
};

const createDomainEntries = entries => {
    const domains = Object.entries(entries).reduce((acc, [key, detail]) => {
        acc[key] = detail.map(createDomainOption);
        return acc;
    }, {});

    return Object.freeze(domains);
};

export default createDomainEntries;
