

export const getUserMedia = async ( videoRef ) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    videoRef.current.srcObject = stream;
  } catch (err) {
    console.log(err);
  }
};

export const stopVideo = ( videoRef ) => {
  videoRef.current.srcObject.getTracks().forEach(track => track.stop());
}
