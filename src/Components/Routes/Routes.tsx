import { Route, Routes } from "react-router-dom";
import AppRoutingRoles from "./Routing-Roles/AppRoles";
import AppRoutes from "./App-Routes/appRoutes";
import AbstractRoutingRoles from "./Routing-Roles/AbstractRoles";
import AbstractRoutes from "./Auth-Routes/abstractRoutes";
import PublicRoutes from "./Public-Routes/publicRoutes";
import ViewBill from "../../Pages/Bills/View/viewBill";
import ViewReport from "../../Pages/Reports/View/viewReport";

const Routing = () => {
    return ( 
            <>
                <Routes>
                <Route element={<AppRoutingRoles />}>
                    <Route path='/*' index element={<AppRoutes />} />
                </Route>

                <Route element={<AbstractRoutingRoles />}>
                    <Route path='/auth/*' index element={<AbstractRoutes />} />
                </Route>

                <Route path='/pub/*' index element={<PublicRoutes />} />

                <Route element={<AppRoutingRoles />}>
                    <Route path='/dashboard/bills/viewbill' index element={<ViewBill />} />
                    <Route path='/dashboard/reports/viewreport' index element={<ViewReport />} />
                </Route>
            </Routes>
            </>
    );
}

export default Routing;