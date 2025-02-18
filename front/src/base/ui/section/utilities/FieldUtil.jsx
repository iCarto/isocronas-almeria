import {SectionField} from "base/ui/section/components";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";

const FieldUtil = {
    getValue(value, unit) {
        if (value && unit) {
            return `${value} ${unit}`;
        } else if (value && !unit) {
            return `${value}`;
        } else return "—";
    },

    // TO-DO: Pass params in one object
    getSectionField(
        label,
        value,
        unit = null,
        tooltipText = null,
        linkPath = null,
        isHighlighted = false,
        longField = false
    ) {
        return (
            <SectionField
                key={label}
                label={label}
                value={value}
                unit={unit}
                tooltipText={tooltipText}
                linkPath={linkPath}
                isHighlighted={isHighlighted}
                longField={longField}
            />
        );
    },

    getSectionFieldHighlight({
        label,
        value,
        unit = null,
        tooltipText = null,
        linkPath = null,
    }) {
        return this.getSectionField(label, value, unit, tooltipText, linkPath, true);
    },

    getSectionFieldLong({
        label,
        value,
        unit = null,
        tooltipText = null,
        linkPath = null,
    }) {
        return (
            <Stack mt={1}>
                {this.getSectionField(
                    label,
                    value,
                    unit,
                    tooltipText,
                    linkPath,
                    false,
                    true
                )}
            </Stack>
        );
    },

    getSectionCheckBoxField(label, value) {
        return (
            <SectionField
                key={label}
                label={label}
                value={<Checkbox checked={value} disabled />}
                hideValueBox
            />
        );
    },

    // getSectionDomainField(label, value, domain) {
    //     // Remember to include <DomainProvider> in some place of parents components tree
    //     return <SectionDomainField label={label} value={value} fieldDomain={domain} />;
    // },
};

export default FieldUtil;
