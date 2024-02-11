import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import { selectCurrentUser } from "../store/user/user.selectors";
import { useSelector } from 'react-redux';



function RedirectIfAuthenticated() {
    const user = useSelector(selectCurrentUser);
    return (
        !user 
        ? <Outlet /> 
         : <Navigate to="/"  /> 
    );
}

export default RedirectIfAuthenticated