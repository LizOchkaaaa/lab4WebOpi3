import {connect, InputText, Link} from 'react-redux';
import {useState} from "react";
import {userActions} from "../actions/userAction";
const Register = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const registration = (e) => {
        e.preventDefault();
        props.dispatch(userActions.register({
            username: username,
            password: password
        }));
    }
    return (
        localStorage.getItem("user") ?
            window.location = '/' :
            <div className={'register-div'}>
                <form className={'form'} onSubmit={Register}>
                    <InputText maxLength={50} name={'username'} className={'username-input'} value={username} placeholder={"login"} onChange={(e) => setUsername(e.target.value)}/><br/>
                    <InputText maxLength={50} name={'password'} className={'password-input'} value={password} type={"password"} placeholder={"password"} onChange={(e) => setPassword(e.target.value)}/><br/>
                    <button className={'submit'} type={"submit"}><span>Регистрация</span><i></i></button><br/>
                    <Link className={'link'} to={'/signin'}>Войти</Link>
                </form>
            </div>
    )
}
export default connect()(Register)

