

import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Home } from '../components/homeScreen/Home';
import { Login } from '../components/loginScreen/Login';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import { AuthContext } from '../auth/authContext';

export const AppRouter = () => {

    const [isLogged, setIsLogged] = useState(false);

    const { user } = useContext( AuthContext );

    useEffect(() => {
      user.logged ? setIsLogged(true) : setIsLogged(false);
    }, [user])
    
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PrivateRoutes isLogged={isLogged} />} >
                    <Route path="/home" element={<Home />}></Route>
                </Route>

                <Route element={<PublicRoutes isLogged={isLogged} />} >
                    <Route path="/login" element={<Login />} />
                </Route>

                <Route path="/*" element={ <Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    )
}
