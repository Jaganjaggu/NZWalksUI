import { Dispatch, SetStateAction, createContext, useContext } from "react";

export interface LoginContext{
    Username: string;
    Password: string;
    setUserName: Dispatch<SetStateAction<string>>
    setPassword: Dispatch<SetStateAction<string>>
}

const defaultState = {
    Username:'',
    Password:'',
    setUserName:() => {},
    setPassword:() => {},
}as LoginContext

export const LoginPageContext = createContext(defaultState);
export const LoginPageContextProvider = LoginPageContext.Provider;
export const useLoginPageContext = () => useContext(LoginPageContext);