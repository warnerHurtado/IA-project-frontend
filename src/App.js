import { useEffect, useReducer } from "react";
import { authReducer } from "./auth/authReducer";
import { AppRouter } from "./routes/AppRouter";
import { AuthContext } from './auth/authContext'

const init = () => {
  return JSON.parse(localStorage.getItem('user')) || { logged: false };
}


export const App = () => {

  const [ user, dispatch ] = useReducer( authReducer, {}, init );

  useEffect(() => {
    if (!user) return;
    localStorage.setItem('user', JSON.stringify(user));
  }, [user])
  

  return (
    <AuthContext.Provider value={ { user, dispatch }}>
      <AppRouter />
    </AuthContext.Provider>
  )
}
