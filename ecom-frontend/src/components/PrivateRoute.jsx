import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({publicPage=false}) => {

    // Comprobar si el usuario esta loggeado.
    const {user} = useSelector((state) => state.auth);

    //Lógica para páginas publicas
    if(publicPage) {
        return user ?
                <Navigate to="/" /> : <Outlet />
    }


    //Lógica para páginas privadas
    return user ? <Outlet /> : <Navigate to="/login" />
}



export default PrivateRoute;