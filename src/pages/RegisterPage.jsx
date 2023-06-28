import React from 'react'
import {useState} from 'react'
import { useAuth } from '../utils/AuthContext'
import { Link } from 'react-router-dom'
const RegisterPage = () => {
    const { handleUserRegister } = useAuth()
    const [credentials, setCredentials] = useState({
        name: '',
        password1: '',
        password2:''
    })
    const handleInputChange = (e) => {
        let name = e.target.name
        let value = e.target.value 
    
        setCredentials({...credentials, [name]:value})
        // console.log('CREDS:', credentials)
      }
  return (
    <div className='auth--container'>
    <div className='form--wrapper'>
        <form onSubmit={(e) => { handleUserRegister(e, credentials) }}>
        <h1 className='login'>Register</h1>
      <div className="field--wrapper">
                <label>Name:</label>
                <input 
                  required
                  type="text" 
                  name="name"
                  value={credentials.name}
                  placeholder="Enter your name..."
                  onChange={(e) => {handleInputChange(e)}}
                />
            </div>
                  <div className='field--wrapper'>
        <label>Email:</label>
                <input 
                required
                type="email"
                name="email"
                placeholder="Enter your email..."
                value={credentials.email}
                onChange={(e) => {handleInputChange(e)}}
                />
          
        </div>
        <div className='field--wrapper'>
        <label>Password1:</label>
                <input 
                required
                type="password"
                name="password1"
                placeholder="Enter password..."
                value={credentials.password1}
                onChange={(e) => {handleInputChange(e)}}
                />
          
        </div>
        <div className='field--wrapper'>
        <label>Password2:</label>
                <input 
                required
                type="password"
                name="password2"
                placeholder="Enter password..."
                value={credentials.password2}
                onChange={(e) => {handleInputChange(e)}}
                />
          
        </div>
        <div className="field--wrapper">
           <input className="btn btn--lg btn--main" type="submit" value="register" />
        </div>
      </form>
      <p >Back to Login <Link to="/Login">here</Link></p>

    </div  >
  </div>
  )
}

export default RegisterPage