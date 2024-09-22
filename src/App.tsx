import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import RegisterPageProvider from './pages/RegisterPageProvider';
import LoginPageProvider from './pages/LoginPageProvider';
import { PivotLargeExample } from './components/PivotLargeExample';

const App: React.FC = () => {

  return (
    <>
    <Routes>
      <Route path='/' element={<RegisterPageProvider/>}/>
      <Route path='/Login' element={<LoginPageProvider/>}/>
      <Route path='/Home' element={<PivotLargeExample/>}/>
    </Routes>
    </>
  );
};

export default App
