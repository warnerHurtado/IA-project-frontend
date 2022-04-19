

export const sendData = async (model, data) => {

    var formdata = new FormData();
    formdata.append("model", model);
    formdata.append("data", JSON.stringify(data));

    const rawResponse = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        //body: JSON.stringify({ model, data }),
        body: formdata,
        redirect: 'follow'
    });

    const content = await rawResponse.json();

    return content;
}