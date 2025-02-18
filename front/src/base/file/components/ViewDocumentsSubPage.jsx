import {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {msg} from "@lingui/macro";
import {useLingui} from "@lingui/react";

import {FolderViewProvider} from "../provider";
import {ListFolder} from ".";
import {SectionCard} from "base/ui/section/components";

const ViewDocumentsSubPage = ({
    entity,
    basePath,
    lookupIdField = "id",
    disabled = false,
}) => {
    const {_} = useLingui();

    const [folderPath, setFolderPath] = useState(null);
    const [selectedElement, setSelectedElement] = useState(null);

    const params = useParams();
    const {pathname} = useLocation();
    const navigate = useNavigate();

    const baseDocumentsPath =
        entity && `${basePath}/${entity[lookupIdField]}/documents/`;

    useEffect(() => {
        let path = params["*"];

        console.log(path, entity, params, folderPath);

        if (!path) {
            path = entity?.folder;
        }
        if (pathname.startsWith(baseDocumentsPath + "detail")) {
            // If we are in detail view
            setFolderPath(path.split("/").slice(0, -1).join("/"));
        } else {
            setFolderPath(path);
        }
    }, [params, entity]);

    const handleSelectElement = folderElement => {
        setSelectedElement(folderElement);
        if (folderElement.content_type) {
            navigate(baseDocumentsPath + "detail/" + folderElement.path);
        } else {
            navigate(baseDocumentsPath + folderPath);
        }
    };

    return (
        <SectionCard title={_(msg`Files`)}>
            {folderPath && (
                <FolderViewProvider>
                    <ListFolder
                        folderPath={folderPath}
                        basePath={baseDocumentsPath}
                        selectedElement={selectedElement}
                        onSelectElement={handleSelectElement}
                        disabled={disabled}
                    />
                </FolderViewProvider>
            )}
        </SectionCard>
    );
};

export default ViewDocumentsSubPage;
