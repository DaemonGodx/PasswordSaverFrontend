import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Outlet} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../src/store/authSlice'

function App() {
  const dispatch=useDispatch()
  const storedUser = localStorage.getItem("user");
if (storedUser) {
  dispatch(login(JSON.parse(storedUser)));
}
 


  return <Outlet/>
}

export default App
