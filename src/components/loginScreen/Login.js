import React, { useContext, useEffect, useRef, useState } from "react";
import { takeSnapshot } from "../../helpers/face-detection";
import { getUserMedia } from "../../helpers/user-media-camera";
import { AuthContext } from '../../auth/authContext';

import "./loginStyle.css";

export const Login = () => {


  const [showCamera, setShowCamera] = useState(true);
  const [showMsg, setShowMsg] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { dispatch } = useContext( AuthContext );

  
  useEffect(() => {
    getUserMedia(videoRef);
  }, []);

  const handleSnapshot = () => {
    takeSnapshot(canvasRef, videoRef, setShowCamera, setShowMsg, dispatch)
  };

  // Desactivar el canvas hasta que se tome el snapshot
  return (
    <>
      <div className="container text-center mt-5 animate__animated animate__flipInX" id="camera">
        <div className="card card-shadow">
          <div className="card-header">
            <h3>Bienvenido a Jarvis-TEC</h3>
          </div>

          <div className="card-body">
            <div className="images-container mt-5">
              <video width={300} ref={videoRef} autoPlay />

              <div>
                <canvas ref={canvasRef} id="canvas" />
              </div>
            </div>

            {showMsg && (
              <div className="alert alert-warning" role="alert">
                Debes sonreír para poder iniciar la aplicación
              </div>
            )}


            <div className="btn-container text-center mt-3">
              <button
                disabled={!showCamera}
                className="btn btn-primary"
                type="button"
                onClick={handleSnapshot}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
