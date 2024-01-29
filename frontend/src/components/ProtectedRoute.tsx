import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({children , user , redirectTo} : any) => {

    if(!user) {
        return <Navigate to={redirectTo} />
    }
    
    return children ? children : <Outlet />
}

export default ProtectedRoute;