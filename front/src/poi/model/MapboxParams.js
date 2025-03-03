const round = (value, step = 0.0005) => {
    var inv = 1.0 / step;
    return Math.round(value * inv) / inv;
};

const getToday = () => {
    const now = new Date(Date.now());
    now.setHours(0, 0, 0, 0);
    return now;
};

class MapboxParams {
    constructor(profile, coordinates, contours) {
        // mapbox/driving	mapbox/walking	mapbox/cycling
        this.profile = profile;
        // Leaflet LatLng
        // this.org_coordinates = coordinates;
        // {longitude,latitude}
        this.coordinates = {
            lng: round(coordinates.latlng.lng),
            lat: round(coordinates.latlng.lat),
        };
        // `${)},${round(coordinates.latlng.lat)}`;
        // 5,10,15
        this.contours = contours;
        // this.polygons = true;
        // 0.0 - 1.0
        // this.denoise = 1.0;
        // this.generalize = undefined;
        this.created_at = getToday();
    }

    getURL() {
        const coordinates = `${round(this.coordinates.lng)},${round(this.coordinates.lat)}`;
        const base_url = "https://api.mapbox.com/isochrone/v1";
        return `${base_url}/${this.profile}/${coordinates}?contours_minutes=${this.contours}&polygons=true&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`;
    }

    getKey() {
        return `${round(this.coordinates.lng)},${round(this.coordinates.lat)}${this.profile}${this.contours}`;
    }
}

export default MapboxParams;
