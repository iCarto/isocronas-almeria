import {useCallback, useEffect} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {useLingui} from "@lingui/react";
import {msg} from "@lingui/macro";

import {useEntityListPageContext} from "base/entity/provider";
import {useListPageGroupContext} from "base/ui/page/provider";
import {SearchBox} from "base/search/components";

const EntityListSearchForm = ({label}) => {
    const {_} = useLingui();
    const {pageGroupFilter, setFilterValue} = useListPageGroupContext();
    const {setPage} = useEntityListPageContext();

    const formMethods = useForm({
        defaultValues: {
            search: pageGroupFilter?.search || "",
        },
    });

    useEffect(() => {
        formMethods.reset({search: pageGroupFilter?.search || ""});
    }, [pageGroupFilter]);

    const handleChange = useCallback(
        (property, value) => {
            setPage(1);
            setFilterValue(property, value);
        },
        [pageGroupFilter]
    );

    return (
        <FormProvider {...formMethods}>
            <SearchBox
                name="search"
                label={_(msg`Search for ${label.plural.toLowerCase()}`)}
                onChangeHandler={value => handleChange("search", value)}
            />
        </FormProvider>
    );
};

export default EntityListSearchForm;
