import React, { useState } from 'react'
import Login from './Login'
import { LoginContext, LoginPageContext, LoginPageContextProvider } from '../Contexts/LoginPageContext';

const LoginPageProvider: React.FC = () => {
    const [Username, setUserName] = useState<string>('');
    const [Password, setPassword] = useState<string>('');

    console.log('CurrentLogin Context Values:', { Username, Password });


    const contextValues: LoginContext= {
        Username,
        Password,
        setUserName,
        setPassword,
    };

    return (
        <LoginPageContextProvider value={contextValues}>
            <Login />
        </LoginPageContextProvider>
    )
}

export default LoginPageProvider