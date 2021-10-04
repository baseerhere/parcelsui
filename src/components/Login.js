import React, { useState } from 'react'
import axios from 'axios';

export default function Login(props) {

    // Initial state
    const initialLoginState = {
        email: '',
        password: ''
    };

    // states for the form and error message
    const [loginState, setLoginState] = useState(initialLoginState);
    const [loginErrorMessage, setLoginErrorMessage] = useState('');

    // the event for form post
    const postLogin = async (e) => {
        e.preventDefault();
        try {
            const authenticateUrl = process.env.REACT_APP_API_BASE_URL + 'authentication';
            const authenticationData = { ...loginState, "strategy": "local" };
            const { data: authenticateResult } = await axios.post(authenticateUrl, authenticationData);

            props.setToken(authenticateResult.accessToken);

        } catch (err) {
            setLoginErrorMessage(`Incorrect credentials ${err.message}`);
        }
    }

    return (
        <div className="login-form">
            <form onSubmit={postLogin}>
                <h2 className="text-center">Authenticate</h2>
                <p className="text-danger">{loginErrorMessage}&nbsp;</p>
                <div className="form-group">
                    <input type="email" className="form-control"
                        placeholder="Email" required="required" value={loginState.email}
                        onChange={e => setLoginState({ ...loginState, email: e.target.value })} />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control"
                        placeholder="Password" required="required" value={loginState.password}
                        onChange={e => setLoginState({ ...loginState, password: e.target.value })} />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">Log in</button>
                </div>
            </form>
        </div>
    )
}
