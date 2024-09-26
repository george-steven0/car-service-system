import { Route, Routes } from "react-router-dom";
import Login from "../../../Pages/Auth/login";

const AbstractRoutes = () => {
    return ( 
        <Routes>
            <Route path="/auth/login" element={<Login />} />
        </Routes>
    );
}

export default AbstractRoutes;