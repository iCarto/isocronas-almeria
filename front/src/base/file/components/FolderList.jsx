import {FolderDetailItem, DocumentDetailItem} from ".";

import Grid from "@mui/material/Grid";

const FolderList = ({folderElements, selectedElement, onSelectElement, basePath}) => {
    return (
        <Grid container spacing={2}>
            {folderElements.map(folderElement => {
                if (folderElement.children) {
                    return (
                        <Grid item xs={3} key={folderElement.name}>
                            <FolderDetailItem
                                folder={folderElement}
                                basePath={basePath}
                                selected={selectedElement?.name === folderElement.name}
                                onSelect={onSelectElement}
                            />
                        </Grid>
                    );
                } else {
                    return (
                        <Grid item xs={3} key={folderElement.name}>
                            <DocumentDetailItem
                                document={folderElement}
                                basePath={basePath}
                                selected={selectedElement?.name === folderElement.name}
                                onSelect={onSelectElement}
                            />
                        </Grid>
                    );
                }
            })}
        </Grid>
    );
};

export default FolderList;
