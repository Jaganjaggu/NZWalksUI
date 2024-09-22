import { createContext, Dispatch, SetStateAction, useContext } from "react";

export interface RegisterContext {
    Username: string;
    Password: string;
    Roles: string[];
    setUserName: Dispatch<SetStateAction<string>>
    setPassword: Dispatch<SetStateAction<string>>
    setRole: Dispatch<SetStateAction<string[]>>
}

const defaultState = {
    Username:'',
    Password:'',
    Roles:[],
    setUserName:() => {},
    setPassword:() => {},
    setRole:()=>{}
}as RegisterContext

export const RegisterPageContext = createContext(defaultState);
export const RegisterPageContextProvider = RegisterPageContext.Provider;
export const useRegisterPageContext = () => useContext(RegisterPageContext)