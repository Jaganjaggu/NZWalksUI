import { IStackTokens, PrimaryButton, Stack, TextField } from '@fluentui/react'
import React, { useState } from 'react'
import { useLoginStyles } from './LoginStyle';
import { Link } from 'react-router-dom';
import { useLoginPageContext } from '../Contexts/LoginPageContext';
import { loginAPI } from '../Services/allAPI';

const Login: React.FC = () => {


  const stackTokens: IStackTokens = { childrenGap: 15 };
  const { Username, Password, setUserName, setPassword } = useLoginPageContext();
  console.log({ Username }, { Password });

  const styles = useLoginStyles;

  const handleLogin = async () => {
    try{
      const user = {
        Username,
        Password
      };
      
      const response = await loginAPI(user);
      if(response.status === 200){
        console.log('Login Successful: ',response.data);
        setUserName("")
        setPassword("")
      }else{
        console.log(response);
      }


    }catch(error){
      console.log('Registration failed:',error);
    }
  }

  return (
    <>
      <div className={styles.main}>
        <Stack tokens={stackTokens} className={styles.container}>
          <div className={styles.title}>Register</div>

          <TextField
            label="User Name"
            className={styles.textfield}
            value={Username}
            onChange={(e, newValue) => { setUserName(newValue || '') }}
          />

          <TextField
            label='Password'
            type='password'
            value={Password}
            onChange={(e, newValue) => { setPassword(newValue || '') }}
          />

          <PrimaryButton text="Login" onClick={handleLogin}/>
          <div className=''>
            <span>Don't have an account? </span>
            <Link to="/" style={{ marginTop: '10px', textDecoration: 'none', color: '#0078d4' }}>
              Register
            </Link>
          </div>

        </Stack>
      </div>
    </>
  )
}

export default Login

