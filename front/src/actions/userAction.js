import axios from 'axios';
import {encode as base64_encode} from 'base-64'
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const SET_LOGIN = 'SET_LOGIN';
export const SET_PASSWORD = 'SET_PASSWORD';
export const SET_ANSWER = 'SET_ANSWER';
export const SET_SIGN_IN = "SET_SIGN_IN";


export function setLogin(login) {
    return {
        type: SET_LOGIN,
        payload: login
    }
}

export function setPassword(password) {
    return {
        type: SET_PASSWORD,
        payload: password
    }
}

export function setAnswer(answer) {
    return {
        type: SET_ANSWER,
        payload: answer
    }
}

export function registration(user, event) {
    event.preventDefault(event);
    let bodyFormData = new FormData();
    bodyFormData.append('username', user.login);
    bodyFormData.append('password', user.password);
    return dispatch => {
        axios({
            method: "post",
            url: 'http://localhost:8585/register',
            data: bodyFormData,
            headers: { 'Content-Type': 'application/json' },
        })
            .then(result => {
                if (result.data) {
                    dispatch({
                        type: SET_ANSWER,
                        payload: "Вы успешно зарегистрировались"
                    });
                    dispatch({
                        type: SET_SIGN_IN,
                        payload: true
                    })
                    window.location = '/main'
                } else {
                    dispatch({
                        type: SET_ANSWER,
                        payload: "Пользователь с таким логином уже зарегистрирован",
                    });
                }
            })
            .catch(error => {
                let answer = error.message
                dispatch({
                    type: SET_ANSWER,
                    payload: answer,
                });
            });
        dispatch({
            type: SET_LOGIN,
            payload: '',

        });
        dispatch({
            type: SET_PASSWORD,
            payload: '',
        });
    }
}
export function login(user, event) {
    event.preventDefault(event);
    let header = base64_encode(user.login + ':' + user.password);
    return dispatch => {
        axios({
            method: "POST",
            url: 'http://localhost:8585/login',
            headers: { 'Content-Type': 'application/json',
                'Authorization': 'Basic ' + header},
        })
            .then(result => {

                if (result.data) {
                    localStorage.setItem("user", header);
                    dispatch({
                        type: SET_ANSWER,
                        payload: "Вы успешно зарегистрировались"
                    });
                    dispatch({
                        type: SET_SIGN_IN,
                        payload: true,
                    })
                    window.location = '/main';
                } else {
                    dispatch({
                        type: SET_ANSWER,
                        payload: 'Введен неправильный пароль или логин',
                    });
                }
            })
            .catch(error => {
                let status = error.response ? error.response.status : null;
                let answer = 'Error';
                if (status === 415 || status === 400) answer = 'Ошибка';
                if (status === 401) answer = 'Вы не прошли аутентификацию';
                if (status === 404) answer = 'Потеряно соединение';
                dispatch({
                    type: SET_ANSWER,
                    payload: answer,
                });
            });

        dispatch({
            type: SET_LOGIN,
            payload: '',
        });

        dispatch({
            type: SET_PASSWORD,
            payload: '',
        });
    };
}
export function signIn(isLogin) {
   return{
       type: SET_SIGN_IN,
       payload: isLogin
   }
}