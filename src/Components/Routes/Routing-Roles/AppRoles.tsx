import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../Redux/TsHooks";

const AppRoutingRoles = () => {
    const {auth} = useAppSelector(state=>state?.auth)    

    return auth ? <Outlet /> : <Navigate to='/login' replace />
}
export default AppRoutingRoles;