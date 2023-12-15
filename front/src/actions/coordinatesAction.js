import axios from 'axios';

export const SET_X = 'SET_X';
export const SET_Y = 'SET_Y';
export const SET_R = 'SET_R';
export const ADD_POINT = "ADD_POINT";
export const SET_TABLE = "SET_TABLE";
export const SET_ANSWER = "SET_ANSWER";

export function setX(X) {
    return {
        type: SET_X,
        payload: X
    }
}

export function setY(Y) {
    return {
        type: SET_Y,
        payload: Y
    }
}

export function setR(R) {
    return {
        type: SET_R,
        payload: R
    }
}

export function setAnswer(answer) {
    return {
        type: SET_ANSWER,
        payload: answer
    }
}
export function sendPoint(point) {
    let bodyFormData = new FormData();
    bodyFormData.append('x', point.x);
    bodyFormData.append('y', point.y);
    bodyFormData.append('r', point.r);
    return dispatch => {
        axios({
            url: 'http://localhost:8585/hits',
            data: bodyFormData,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                  'Authorization': localStorage.getItem("user")
            }
        })
            .then(result => {
                if (result.data != null) {
                    dispatch({
                        type: ADD_POINT,
                        payload: result.data,
                    })
                } else {
                    dispatch({
                        type: SET_ANSWER,
                    })
                }
            })
            .catch(error => {
                let status = error.response.message;
                let answer = 'Error';
                if (status === 415 || status === 400 ) answer = 'Ошибка';
                if (status === 401) {
                    answer = 'Вы не прошли аутентификацию';
                    window.location = "/"
                }
                if (status === 404) answer = 'Потеряно соединение';
                dispatch({
                    type: SET_ANSWER,
                    payload: answer,
                });
            });
        dispatch({
            type: SET_X,
            payload: null,
        });
    }
}

export function getPoints() {
    return dispatch => {
        axios({
            url: 'http://localhost:8585/hits',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                  'Authorization': localStorage.getItem("user")
            }
        }).then(data => {
            dispatch({
                type: SET_TABLE,
                payload: data.data
            })
        }).catch(error => {
            let status = error.response.status;
            console.log(error.response.status);
            let answer = 'Error';
            if (status === 415 || status === 400) {
                answer = 'Ошибка';
                window.location = "/"
            }
            if (status === 401) {
                answer = 'Вы не прошли аутентификацию';
                window.location = "/"
            }
            if (status === 404) answer = 'Потеряно соединение';
            dispatch({
                type: SET_ANSWER,
                payload: answer,
            });
        });
    }
}