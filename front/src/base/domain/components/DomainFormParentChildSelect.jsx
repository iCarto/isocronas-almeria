import {useEffect, useState} from "react";
import {useFormContext, useWatch} from "react-hook-form";
import {useDomainContext} from "base/domain/provider";

import {FormSelect} from "base/form/components";

import Stack from "@mui/material/Stack";

const DomainFormParentChildSelect = ({
    parent: {
        name: parentName,
        label: parentLabel,
        category: parentCategory,
        rules: parentRules = {},
        disabled: parentDisabled = null,
    },
    child: {
        name: childName,
        label: childLabel,
        category: childCategory,
        rules: childRules = {},
    },
}) => {
    const {domains} = useDomainContext();
    const {control} = useFormContext();

    const [childOptions, setChildOptions] = useState([]);

    const parentValue = useWatch({
        control,
        name: parentName,
    });

    useEffect(() => {
        const parent = domains[parentCategory].find(
            parent => parent.value === parentValue
        );
        setChildOptions(parent?.children[childCategory] || []);
    }, [childCategory, domains, parentCategory, parentValue]);

    return (
        domains && (
            <Stack direction="row" spacing={1} sx={{my: 1}}>
                <FormSelect
                    name={parentName}
                    label={parentLabel}
                    options={domains[parentCategory]}
                    rules={parentRules}
                    disabled={parentDisabled}
                />
                <FormSelect
                    name={childName}
                    label={childLabel}
                    options={childOptions}
                    rules={childRules}
                    disabled={childOptions.length === 0}
                />
            </Stack>
        )
    );
};

export default DomainFormParentChildSelect;
