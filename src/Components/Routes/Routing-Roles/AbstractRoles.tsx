import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../Redux/TsHooks";

const AbstractRoutingRoles = () => {
    const {auth} = useAppSelector(state=>state?.auth)    

    return auth ? <Navigate to='/dashboard/home' replace /> : <Outlet />
}
export default AbstractRoutingRoles;