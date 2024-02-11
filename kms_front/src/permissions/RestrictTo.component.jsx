import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import { selectCurrentUser } from "../store/user/user.selectors";
import { useSelector } from 'react-redux';


function RestrictTo({roles}) {
    const user = useSelector(selectCurrentUser);
    return (
        roles.includes(user.role) 
        ? <Outlet /> 
         : <Navigate to="/"  /> 
    );
}

export default RestrictTo

// exports.restrictTo = (...roles) => {
//     return (req, res, next) => {
//       // roles ['admin', 'lead-guide']. role='user'
//       if (!roles.includes(req.user.role)) {
//         return next(
//           new AppError('You do not have permission to perform this action', 403)
//         );
//       }
  
//       next();
//     };
//   };