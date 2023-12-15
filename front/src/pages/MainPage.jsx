import React, {Component} from 'react';
import Graf from "./Graf";
import Table from "./Table";
import {connect} from "react-redux";
import {getPoints} from "../actions/coordinatesAction";
import {setAnswer, signIn} from "../actions/userAction";
import ChooseForm from "./ChooseForm";
import "../screen/mainPage.css";
class MainPage extends Component{
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        this.getPoints();
    }

    getPoints() {
        this.props.getPoints();
    }
    logout() {
        this.props.setAnswer('');
        this.props.setSignIn(false);
        localStorage.setItem("user", undefined);
        window.location = "/"
    }
    clear(){
        this.props.dispatch(this.props.coordinates)
    }
    render(){
        return(
            <div>
                <ChooseForm/>
                <Graf/>
                <Table/>
                <button className="return" onClick={this.logout}
                        >Выйти
                </button>

            </div>
        )

    }
}
const stateToProps = store => {
    return {
        app: store.app,
    }
};

const dispatchToProps = dispatch => {
    return {
        getPoints: () => dispatch(getPoints()),
        setSignIn: (logIn) => dispatch(signIn(logIn)),
        setAnswer: (answer) => dispatch(setAnswer(answer))
    }
};

export default (connect(stateToProps, dispatchToProps)(MainPage));
