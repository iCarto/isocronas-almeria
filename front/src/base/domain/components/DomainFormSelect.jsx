import {useDomainContext} from "base/domain/provider";

import {FormSelect, FormSelectUncontrolled} from "base/form/components";

const DomainFormSelect = ({
    name: propsName,
    label,
    category = "",
    options = null,
    onChange = null,
    rules = {},
    disabled = false,
    uncontrolled = false,
}) => {
    const {domains} = useDomainContext();

    return (
        domains &&
        (uncontrolled ? (
            <FormSelectUncontrolled
                label={label}
                options={options || domains[category]}
                onChange={onChange}
                rules={rules}
                disabled={disabled}
            />
        ) : (
            <FormSelect
                name={propsName}
                label={label}
                options={options || domains[category]}
                onChangeHandler={onChange}
                rules={rules}
                disabled={disabled}
            />
        ))
    );
};

export default DomainFormSelect;
