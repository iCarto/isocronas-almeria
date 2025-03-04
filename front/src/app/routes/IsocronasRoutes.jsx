import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {IsocronasAuthApp} from "app/ui";
import {PoiMapPage} from "poi/page/list";

export default function IsocronasRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="" element={<IsocronasAuthApp />}>
                    <Route
                        key="poi-map"
                        path=""
                        element={<PoiMapPage key="poi-all-list-page" />}
                    />
                </Route>
            </Routes>
        </Router>
    );
}
