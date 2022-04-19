import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../auth/authContext';
import { types } from '../../types/types';
import useSpeechToText from 'react-hook-speech-to-text';
import { Predictions } from './Predictions';

export const Home = () => {

  const { dispatch } = useContext(AuthContext);

  const [nameModel, setNameModel] = useState(null);
  const [searching, setSearching] = useState(null);

  const handleLogout = () => {

    dispatch({ type: types.logout });
  };

  const {
    error,
    //interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {

    setNameModel(null);

    setSearching(results[results.length - 1]?.transcript);

    if (results[results.length - 1]) {
      results[results.length - 1]?.transcript.includes('aguacate') && setNameModel('avocado_model');
      results[results.length - 1]?.transcript.includes('carro') && setNameModel('car_model');
      results[results.length - 1]?.transcript.includes('masa') && setNameModel('mass_model');
      results[results.length - 1]?.transcript.includes('bitcoin') && setNameModel('bitcoin_model');
      results[results.length - 1]?.transcript.includes('cancer') && setNameModel('breast_cancer');
      results[results.length - 1]?.transcript.includes('ventas') && setNameModel('rossman_sales_model');
      results[results.length - 1]?.transcript.includes('caballo') && setNameModel('horse_power_calculator');
      results[results.length - 1]?.transcript.includes('salario') && setNameModel('salary_years_calculator');
      results[results.length - 1]?.transcript.includes('cargos') && setNameModel('charges_model');
    }

  }, [results])


  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  return (
    <div className='animate__animated animate__bounceInRight'>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">HOME-IA</a>

          <ul className="nav justify-content-end">
            <li className="nav-item">
              <label className="nav-link" onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</label>
            </li>
          </ul>
        </div>
      </nav>

      <div className='container text-center mt-3'>
        <h1>Recording: {isRecording.toString()}</h1>
        <button className='btn btn-primary' onClick={isRecording ? stopSpeechToText : startSpeechToText}>
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
      </div>

      <div className='container mt-5'>

        {
          nameModel ?
            <div className='container shadow-lg p-3 mb-5 bg-body rounded mt-5'>
              <Predictions 
                nameModel={nameModel} 
                searching={searching}
                />
            </div>

            :

            <div className=" container alert alert-warning text-center" role="alert">
              Dile a Jarvis con que quieres que te ayude.
            </div>
        }
      </div>

    </div>
  )
}
