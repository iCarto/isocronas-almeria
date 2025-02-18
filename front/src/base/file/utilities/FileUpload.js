import {DocumentService} from "base/file/service";

const FileUpload = {
    async uploadFiles(updatedEntity, entity, fileFields) {
        const fileUploadPromises = fileFields.map(fileField => {
            const file = updatedEntity[fileField];
            if (file instanceof File) {
                return new Promise((resolve, reject) => {
                    DocumentService.upload(
                        file,
                        entity.folder,
                        onFinishResult => resolve(onFinishResult.response),
                        () => {},
                        () => {},
                        onFinishError => reject(onFinishError)
                    );
                });
            }
            return Promise.resolve(null);
        });

        return Promise.all(fileUploadPromises);
    },

    updateFormWithFileIds(updatedEntity, fileUploadResults, fileFields) {
        fileFields.forEach((fileField, index) => {
            const file = updatedEntity[fileField];
            if (file && file instanceof File) {
                updatedEntity[fileField] = fileUploadResults[index].id;
            }
        });
    },

    callCallback(callback, isSuccessful) {
        if (callback) {
            callback(isSuccessful);
        }
    },
};

export default FileUpload;
