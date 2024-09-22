import React, { useState } from 'react'
import { RegisterContext, RegisterPageContextProvider } from '../Contexts/RegisterPageContext'
import Register from './Register'

const RegisterPageProvider: React.FC = () => {
    const [Username, setUserName] = useState<string>('');
    const [Password, setPassword] = useState<string>('');
    const [Roles, setRole] = useState<string[]>([]);

    console.log('Current Context Values:', { Username, Password, Roles });


    const contextValues: RegisterContext = {
        Username,
        setUserName,
        setPassword,
        setRole,
        Password,
        Roles
    };

    return (
        <RegisterPageContextProvider value={contextValues}>
            <Register />
        </RegisterPageContextProvider>
    )
}

export default RegisterPageProvider