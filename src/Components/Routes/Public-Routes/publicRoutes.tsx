import { Route, Routes } from "react-router-dom";
import Terms from "../../../Pages/terms";

const PublicRoutes = () => {
    return ( 
        <Routes>
            <Route path="terms&conditions" element={<Terms />} />
        </Routes>
    );
}

export default PublicRoutes;