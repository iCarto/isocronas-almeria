import {useDomainContext} from "base/domain/provider";

import {FormSelectMultipleChip} from "base/form/components";

const DomainFormSelectMultipleChip = ({
    name,
    label,
    category,
    nestedCategory = null,
    onChangeHandler = null,
    rules = {},
}) => {
    const {domains} = useDomainContext();

    return (
        <FormSelectMultipleChip
            name={name}
            label={label}
            options={domains ? domains[category] : []}
            nestedProp={nestedCategory}
            onChangeHandler={onChangeHandler}
            rules={rules}
        />
    );
};

export default DomainFormSelectMultipleChip;
