import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import {IsocronasAuthApp} from "app/ui";
import {EntityListPageGroup} from "base/entity/components/container";
import {PoiModule} from "poi/module";
import {PoiListPage} from "poi/page/list";
import {PoiPanel} from "poi/page/panel";

export default function IsocronasRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="" element={<IsocronasAuthApp />}>
                    <Route path="poi" element={<PoiModule path="poi" />}>
                        <Route
                            key="poi-list-page-group"
                            path="all"
                            element={
                                <EntityListPageGroup
                                    key="poi-list-page-group"
                                    path="all"
                                />
                            }
                        >
                            <Route
                                key="poi-list"
                                path=""
                                element={<PoiListPage key="poi-all-list-page" />}
                            >
                                <Route
                                    key="poi-info"
                                    path="info/:id"
                                    element={<PoiPanel />}
                                />
                            </Route>
                        </Route>
                    </Route>
                    <Route
                        key="redirect-poi-index"
                        index
                        element={<Navigate to="poi/all" replace />}
                    />
                </Route>
            </Routes>
        </Router>
    );
}
