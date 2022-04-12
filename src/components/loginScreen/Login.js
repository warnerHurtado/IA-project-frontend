import React, { useEffect, useRef, useState } from 'react'
import { dataURLtoFile } from '../../helpers/camera';

const msRest = require("@azure/ms-rest-js");
const Face = require("@azure/cognitiveservices-face");

const key = "52b7319cef884cdaae41261c725db620";
const endpoint = "https://eeuu.cognitiveservices.azure.com/";

const credentials = new msRest.ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } });
const client = new Face.FaceClient(credentials, endpoint);

export const Login = () => {

    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const [showCamera, setShowCamera] = useState(true);
    const [showMsg, setShowMsg] = useState(false);

    useEffect(() => {
        const getUserMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                videoRef.current.srcObject = stream;
            } catch (err) {
                console.log(err);
            }
        };
        getUserMedia();
    }, []);

    const takeSnapshot = async () => {
        setShowMsg(false);
        canvasRef.current.height = 300;
        canvasRef.current.getContext('2d').drawImage(videoRef.current, 0, 0, 300, 200);

        const dataImage = canvasRef.current.toDataURL('image/jpg');

        setShowCamera(false);
        const passToFile = await dataURLtoFile(dataImage, 'test.jpg');


        let detected_faces = await client.face.detectWithStream(passToFile,
            {
                returnFaceAttributes: ["Accessories", "Smile"],
                // We specify detection model 1 because we are retrieving attributes.
                detectionModel: "detection_01",
                recognitionModel: "recognition_03"
            });
        console.log(detected_faces.length + " face(s) detected from image " + passToFile + ".");

        if (detected_faces.length > 0) {
            setShowCamera(true);
        }

        // Parse and print all attributes of each detected face.
        detected_faces.forEach(async function (face) {

            console.log("Smile: " + face.faceAttributes.smile);
            if (face.faceAttributes.smile === 1) {
                setShowCamera(false);
            }else {
                setShowMsg(true);
            }
        });

    };


    return (
        <>
            <div className='container text-center mt-5' id='camera'>
                {/* <img src={smile} alt='smile' className='img-fluid' /> */}
                <div className='shadow-lg p-3 mb-5 bg-body rounded'>
                    <h3>
                        Welcome to the login
                    </h3>

                    <div className='mt-3'>
                        <video width={300}
                            ref={videoRef}
                            autoPlay
                        />
                    </div>

                    <div>
                        <div>
                            <canvas ref={canvasRef} id='canvas' />

                        </div>
                        {showMsg && <div className="alert alert-danger" role="alert">
                            You must smile to login!
                        </div>}

                        <div className="d-grid gap-2">
                            <button disabled={!showCamera} className="btn btn-primary" type="button" onClick={takeSnapshot}>Login</button>
                        </div>

                    </div>

                </div>

            </div>
        </>


    )
}
