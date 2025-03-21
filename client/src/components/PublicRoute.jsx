import React from 'react'
import { Navigate } from 'react-router-dom'
import useStore from '../store'
export const PublicRoute = () => {

    const isAuthenticated = useStore((state) => state.user.isAuthenticated);

    if(isAuthenticated){
        return <Navigate to="/overview" replace/>
    }

    return children;
}
