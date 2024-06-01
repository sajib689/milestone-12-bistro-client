import { useContext } from "react";
import useAdmin from "../Hooks/useAdmin";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const AdminRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    const [isAdmin,isAdminLoading] = useAdmin()
    const location = useLocation()
   if(loading || isAdminLoading) {
    <p>Loading...</p>
   }
   if(user && isAdmin) {
    return children
   }
   return <Navigate to='/login' state={location.pathname} replace={true}></Navigate>

};

export default AdminRoute;