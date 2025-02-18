class ApiMapper {
    #toPersistence;
    #toDomain;

    constructor(toPersistence, toDomain) {
        this.#toPersistence = toPersistence;
        this.#toDomain = toDomain;
    }

    mapToPersistence(object) {
        if (Array.isArray(object)) {
            return object.map(this.#toPersistence);
        }
        return this.#toPersistence(object);
    }

    mapToDomain(object) {
        if (object.results) {
            // its a response with page results
            return {...object, results: this.mapToDomain(object.results)};
        }
        if (Array.isArray(object)) {
            return object.map(this.#toDomain);
        }
        return this.#toDomain(object);
    }
}

const createApiMapper = ({toPersistence, toDomain}) => {
    return new ApiMapper(toPersistence, toDomain);
};

export default createApiMapper;
