import React, { useContext } from 'react'
import { AuthContext } from '../../auth/authContext';
import { types } from '../../types/types';

export const Home = () => {

  const { dispatch } = useContext( AuthContext );

  const handleLogout = () => {
  
    dispatch({ type: types.logout });  
  }; 

  return (
    <div className='animate__animated animate__bounceInRight'>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">HOME-IA</a>

          <ul className="nav justify-content-end">
            <li className="nav-item">
              <a className="nav-link" href="/">Link</a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href='/'>Disabled</a>
            </li>
            <li className="nav-item">
              <label className="nav-link" onClick={ handleLogout } style={{cursor: 'pointer'}}>Logout</label>
            </li>
          </ul>
        </div>
      </nav>
      <h1>Home</h1>
    </div>
  )
}
