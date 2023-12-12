import React, {Component} from 'react';
 import Form from "./Form";
import {connect} from "react-redux";
import "../screen/index.css";
import img from "../img/itmo.png"
import FormErrors from "./FornErrors.jsx";
import {login, registration, setAnswer, setLogin, setPassword} from "../actions/userAction";
class StartPage extends Component{

    render() {
        return (
            <div >
                <div id="header" className="logo">
                    <img id="logo" src={img} alt={"Лого ИТМО"} width="100" height="85"/>
                    <div className="left-right-line-short-header">Суворова Елизавета Михайловна</div>
                    <div className="left-right-line-short-header1">P3223</div>
                    <div className="left-right-line-short-header2">Вариант 861518</div>
                </div>

                <Form/>
            </div>
        );
    }
}

const stateToProps = store => {
    return {
        user: store.user,
        app: store.app
    }
};

export default (connect(stateToProps)(StartPage));
