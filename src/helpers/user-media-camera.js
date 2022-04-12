

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
