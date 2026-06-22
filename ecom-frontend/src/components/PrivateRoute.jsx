import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({publicPage=false, adminOnly = false}) => {

    // Comprobar si el usuario esta loggeado.
    const {user} = useSelector((state) => state.auth);

    const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");

    //Lógica para páginas publicas
    if(publicPage) {
        return user ?
                <Navigate to="/" /> : <Outlet />
    }

    if(adminOnly) {
        if (!isAdmin) {
            return <Navigate to="/" />
        } 
    }


    //Lógica para páginas privadas
    return user ? <Outlet /> : <Navigate to="/login" />
}



export default PrivateRoute;