import {useState} from "react";
import {Trans} from "@lingui/macro";

import {useDownload} from "base/file/utilities";
import {useErrors} from "base/error/provider";

import {MenuAction} from "base/ui/menu";
import {DownloadPDFButton} from "../presentational";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";

export function useDownloadPDF(service, itemId = null) {
    const {handleErrors, clearErrors} = useErrors();
    const [isLoading, setIsLoading] = useState(false);
    const download = useDownload();

    const handleDownload = id => {
        clearErrors();
        setIsLoading(true);
        service(id)
            .then(response => {
                return download(response);
            })
            .catch(error => {
                handleErrors(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const printAction = (
        <MenuAction
            key="menu-print-action"
            id="menu-print-action"
            icon={<PrintOutlinedIcon />}
            text={<Trans>Download PDF</Trans>}
            handleClick={() => handleDownload(itemId)}
        />
    );

    const tablePrintAction = (
        <MenuAction
            key="table-print-action"
            id="table-print-action"
            icon={<PrintOutlinedIcon />}
            text={<Trans>Download PDF</Trans>}
            handleClick={item => handleDownload(item.id)}
        />
    );

    const printButton = () => (
        <DownloadPDFButton onClick={handleDownload} isLoading={isLoading} />
    );

    return {printAction, tablePrintAction, printButton};
}
