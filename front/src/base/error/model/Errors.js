class FetchError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }

    json() {
        try {
            const parsedMessage = JSON.parse(this.message);
            return {
                ...parsedMessage,
                statusCode: this.statusCode,
            };
        } catch (error) {
            if (error instanceof SyntaxError) {
                // Message is not a JSON
                return null;
            }
            // Something weird happened, so let the error propagate
            throw error;
        }
    }
}

export {FetchError};
