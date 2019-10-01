import axios from 'axios';

export const getRequestFormInfo = (values) => async dispatch => {

    axios.get(`REQUEST_FORM_INFO.json`)
    .then(res => {
        console.log(res);
        dispatch({
            type: 'REQUEST_FORM_INFO',
            payload: res.data
        })
    })
    .catch(function (err) {
        console.log(err.message, err.response);
    });
}