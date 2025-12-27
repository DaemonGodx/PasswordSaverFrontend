import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Protected({children, login=false,signup=false}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
       if(!authStatus && login) setLoader(false)
       else if(!authStatus && signup) setLoader(false)
       else if(authStatus) setLoader(false)
       else if(!authStatus) navigate('/')
       setLoader(false) 
    }, [authStatus, login, signup,navigate])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}