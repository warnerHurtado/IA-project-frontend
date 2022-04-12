import React, { useEffect, useRef, useState } from "react";
import { takeSnapshot } from "../../helpers/face-detection";
import { getUserMedia } from "../../helpers/user-media-camera";
import "./loginStyle.css";

export const Login = () => {
  const [showCamera, setShowCamera] = useState(true);
  const [showMsg, setShowMsg] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    getUserMedia(videoRef);
  }, []);

  const handleSnapshot = () => {
    takeSnapshot(canvasRef, videoRef, setShowCamera, setShowMsg);
  };

  // Desactivar el canvas hasta que se tome el snapshot
  return (
    <>
      <div className="container text-center mt-5" id="camera">
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
