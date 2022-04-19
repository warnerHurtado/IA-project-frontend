const msRest = require ('@azure/ms-rest-js')
const Face = require ('@azure/cognitiveservices-face')


const credentials = new msRest.ApiKeyCredentials({
  inHeader: { "Ocp-Apim-Subscription-Key": process.env.REACT_APP_API_KEY },
})

export const client = new Face.FaceClient(credentials, process.env.REACT_APP_ENDPOINT);
