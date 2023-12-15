import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import React, {Component} from "react";
import StartPage from "./pages/StartPage";
import {authorization, signIn} from "./actions/userAction";
import {connect} from 'react-redux';

class App extends Component {
    constructor(props) {
        super(props);

        this.props.authorization();
    }
    render() {
        return <div>
            <BrowserRouter>
                <Routes>
                    <Route exact  path={"/"} element={<StartPage/>}/>
                    <Route  path={"/main"} element={<MainPage/>}/>
                </Routes>
            </BrowserRouter>
               </div>
    }
}
const mapStateToProps = store => {
    return {
        user: store.user,
        app: store.app
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setSignIn: flag => dispatch(signIn(flag)),
        authorization: () => dispatch(authorization())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
