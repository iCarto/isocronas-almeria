import {t} from "@lingui/macro";
import {FileUtil} from ".";

const FileValidation = {
    validateFile(file, allowedTypes, maxSize) {
        if (!(file instanceof File)) {
            return t`The selected file is not valid.`;
        }
        if (allowedTypes && !this.validateFileType(file, allowedTypes.mime)) {
            return t`The file must be of type ${allowedTypes.tags}.`;
        }
        if (!this.validateFileMaxSize(file, maxSize)) {
            return t`The file size cannot exceed ${FileUtil.formatBytes(maxSize)}.`;
        }
        return true;
    },

    validateFileType(file, allowedTypes) {
        return allowedTypes.includes(file.type);
    },

    validateFileMaxSize(file, maxSize) {
        return file.size <= maxSize;
    },
};

export default FileValidation;
