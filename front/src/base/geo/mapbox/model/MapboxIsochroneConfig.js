const round = (value, step = 0.0005) => {
    var inv = 1.0 / step;
    return Math.round(value * inv) / inv;
};

class MapBoxIsochroneConfig {
    #profile;
    #coordinates;
    #contours;

    get profile() {
        return this.#profile;
    }

    get coordinates() {
        return `${round(this.#coordinates.lng)},${round(this.#coordinates.lat)}`;
    }

    get contours() {
        return this.#contours;
    }

    constructor(profile, coordinates, contours) {
        // Mapbox/driving	Mapbox/walking	Mapbox/cycling
        this.#profile = profile;
        // Leaflet LatLng
        // this.org_coordinates = coordinates;
        // {longitude,latitude}
        this.#coordinates = coordinates;
        // `${)},${round(coordinates.latlng.lat)}`;
        // 5,10,15
        this.#contours = contours;
        // this.polygons = true;
        // 0.0 - 1.0
        // this.denoise = 1.0;
        // this.generalize = undefined;
        // this.created_at = getToday();
    }

    getKey() {
        return `${this.coordinates}${this.profile}${this.contours}`;
    }

    getURL() {
        return `${this.profile}/${this.coordinates}?contours_minutes=${this.contours}&polygons=true`;
    }
}

const createMapBoxIsochroneConfig = ({profile, coordinates, contours}) => {
    return new MapBoxIsochroneConfig(profile, coordinates, contours);
};

export default createMapBoxIsochroneConfig;
