import { Dropdown, initializeIcons, IDropdownOption, IStackTokens, PrimaryButton, Stack, TextField } from '@fluentui/react'
import React, { useState } from 'react'
import { useRegisterStyles } from './RegisterStyle';
import { Link } from 'react-router-dom';
import { RegisterContext, useRegisterPageContext } from '../Contexts/RegisterPageContext';
import { registerAPI } from '../Services/allAPI';
// initializeIcons();

const Register: React.FC = () => {
  const stackTokens: IStackTokens = { childrenGap: 15 };

  const roles: IDropdownOption[] = [
    { key: 'Writer', text: 'Writer' },
    { key: 'Reader', text: 'Reader' },
  ];

  const { Username, Password, Roles, setUserName, setPassword, setRole } = useRegisterPageContext();
  console.log({ Username, Password, Roles });

  const styles = useRegisterStyles;

  const handleRegister = async () => {
    try{
      const user = {
        Username,
        Password,
        Roles
      };
      
      const response = await registerAPI(user);
      if(response.status === 200){
        console.log('Regsistration Successful: ',response.data);
        setUserName("")
        setPassword("")
        setRole([])
      }else{
        console.log(response);
        
      }
    }catch(error){
      console.log('Registration failed:',error);
    }
  };

  return (
    <>
      <div className={styles.main}>
        <Stack tokens={stackTokens} className={styles.container}>
          <div className={styles.title}>Register</div>

          <TextField
            label="User Name"
            value={Username}
            onChange={(e, newValue) => {
              console.log('Username updated:', newValue);
              setUserName(newValue || '')
            }}
          />


          <TextField
            label='Password'
            type='password'
            value={Password}
            onChange={(e, newValue) => { setPassword(newValue || '') }}


          />

          <Dropdown
            placeholder='Select a Role'
            label='Role'
            options={roles}
            selectedKey={Roles}
            onChange={(e, option) => {
              if (option) {
                setRole([option.key as string]); // Set as an array
              }
            }}
          />

          <PrimaryButton text="Register" onClick={handleRegister}/>
          <div className=''>
            <span>Don't have an account? </span>
            <Link to="/Login" style={{ marginTop: '10px', textDecoration: 'none', color: '#0078d4' }}>
              Login
            </Link>
          </div>
        </Stack>
      </div>
    </>
  )
}

export default Register

