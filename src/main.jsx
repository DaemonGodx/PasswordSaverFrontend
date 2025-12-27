import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store'
import {Landing,Login,Signup,Dashboard} from '../src/pages/index.js'
import AuthLayout from './components/AuthLayout.jsx'
import React from 'react'


const route=createBrowserRouter([
  {
    path:'/',
    element:<App/> ,
    children:[
      {
        path:'/',
        element:(<AuthLayout >
          {""}
          <Landing/>
          </AuthLayout>)
      },
      {
        path:'/login',
        element:(<AuthLayout login={true}><Login/></AuthLayout>)

      },
      {
        path:'/signup',
        element:(<AuthLayout signup={true}><Signup/></AuthLayout>)
      },
      {
        path:'/dashboard',
        element:(<AuthLayout >
        {" "}
        <Dashboard/></AuthLayout>)
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
   <React.StrictMode><Provider store={store}>
      <RouterProvider router={route}/>
    </Provider>
  </React.StrictMode>
 
)
