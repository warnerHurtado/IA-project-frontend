import { client } from '../azure-face-detection/azure-face-detection';
import { dataURLtoFile } from '../helpers/camera'
import { stopVideo } from './user-media-camera';
import { types } from '../types/types';

export const takeSnapshot = async (canvasRef, videoRef, setShowCamera, setShowMsg, dispatch) => {

  canvasRef.current.height = 300;
  canvasRef.current
    .getContext("2d")
    .drawImage(videoRef.current, 0, 0, 300, 200);

  const dataImage = canvasRef.current.toDataURL("image/jpg");

  setShowCamera(false);
  const passToFile = dataURLtoFile(dataImage, "test.jpg");

  const detected_faces = await client.face.detectWithStream(passToFile, {
    returnFaceAttributes: ["Accessories", "Smile"],
    detectionModel: "detection_01",
    recognitionModel: "recognition_03",
  });

  if (detected_faces.length > 0) {
    setShowCamera(true)
  }

  detected_faces.forEach(async function ({ faceAttributes }) {
    // Se debe de cambiar **Seguramente para las rutas o la redirección**
    if (faceAttributes.smile >= 0.90) {
      
      setShowCamera(false);
      stopVideo(videoRef);
      dispatch({ type: types.login });

    } else {
      setShowMsg(true);
    }
  })


}






