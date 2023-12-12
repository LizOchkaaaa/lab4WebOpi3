import React, {Component} from "react";
import {connect} from 'react-redux';
import {login, registration, setAnswer, setLogin, setPassword} from "../actions/userAction";
import "../screen/form.css"
import {sendPoint, setR, setX, setY} from "../actions/coordinatesAction";
import FormErrors from "./FornErrors";

class form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formErrors: {login: '', password: '', all: ''},
            loginValid: false,
            passwordValid: false,
        };
        this.userLoginInput = this.userLoginInput.bind(this);
        this.userPasswordInput = this.userPasswordInput.bind(this);
        this.userIsReady = this.userIsReady.bind(this);
    }

    userLoginInput = (e) => {
        let value = e.target.value;
        this.props.setLogin(value);
        this.validateField('login', value);
    };

    userPasswordInput = (e) => {
        let value = e.target.value;
        this.props.setPassword(value);
        this.validateField('password', value);
    };

    userIsReady = (e, option) => {
        let errors = this.state.formErrors;
        if (!this.state.formValid) errors.all = 'Заполните поля';
        else {
            this.prepareUser(this.props.user.login, this.props.user.password, e, option)
        }
    };

    prepareUser(login, password, event, option) {
        let params = {
            login: login,
            password: password
        };
        if (option === "login") {
            this.props.login(params, event);
        }
        if (option === "registration") {
            this.props.registration(params, event);
        }
    }

    validateField(fieldName, value) {
        this.props.setAnswer('');
        let fieldValidationErrors = this.state.formErrors;
        let loginValid = this.state.loginValid;
        let passwordValid = this.state.passwordValid;

        switch (fieldName) {
            case 'login':
                loginValid = (value.indexOf(' ') < 0);
                fieldValidationErrors.login = loginValid ? '' : 'Пробелы в логине недопустимы';
                if (!loginValid) break;
                loginValid = value.length >= 4;
                fieldValidationErrors.login = loginValid ? '' : 'Допускается не меньше чем 4 символа '
                break;

            case 'password':
                passwordValid = (value.indexOf(' ') < 0);
                fieldValidationErrors.password = passwordValid ? '' : 'Пробелы в пароле недопустимы';
                if (!passwordValid) break;
                passwordValid = value.length >= 4;
                fieldValidationErrors.password = passwordValid ? '' : 'Допускается не меньше чем 4 символа '
                break;
            default:
                break;
        }

        this.setState({
            formErrors: fieldValidationErrors,
            loginValid: loginValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({
            formValid: this.state.loginValid &&
                this.state.passwordValid
        });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'input-error')
    }


    render() {
        const {user} = this.props;
        return (
            <form className="form">
                <div className="inputArea">
                    <input value={user.login} className={this.errorClass(this.state.formErrors.login)} type="text"
                           placeholder="Введите логин" onChange={this.userLoginInput}/>
                </div>
                <div className="inputArea2">
                    <input value={user.password} className={this.errorClass(this.state.formErrors.password)}
                           type="password"
                           placeholder="Введите пароль" onChange={this.userPasswordInput}/>
                </div>
                <div className="buttons">
                    <div className="buttonArea">
                        <button className="checkButtonInside"
                                onClick={(event) => this.userIsReady(event, "registration")}
                                disabled={!this.state.formValid}>Регистрация
                        </button>
                    </div>
                    <div className="buttonArea2">
                        <button className="checkButtonInside" onClick={(event) => this.userIsReady(event, "login")}
                                disabled={!this.state.formValid}>Войти
                        </button>
                    </div>

                </div>
                <div className="formErrorsStart">
                    <FormErrors formErrors={this.state.formErrors} answer={this.props.user.userAnswer}/>
                </div>

            </form>
        )
    }
}


    const stateToProps = store => {
        return {
            user: store.user,
        }
    };

    const
    dispatchToProps = dispatch => {
        return {
            setAnswer: answer => dispatch(setAnswer(answer)),
            setLogin: login => dispatch(setLogin(login)),
            setPassword: password => dispatch(setPassword(password)),
            registration: (user, event) => dispatch(registration(user, event)),
            login: (user, event) => dispatch(login(user, event))
        }
    };

export default  (connect(stateToProps, dispatchToProps)(form));
