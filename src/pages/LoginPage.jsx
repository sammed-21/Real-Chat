import React, { useEffect, useState } from 'react'
import { useAuth } from '../utils/AuthContext'
import { useNavigate ,Link} from 'react-router-dom'
const LoginPage = () => {
    const { user,handleUserLogin } = useAuth()
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({email:'',password:''})

    useEffect(() => {
        if (user) {
            console.log('you come here')
         navigate('/')   
        }
    }, []) 
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setCredentials((prevCredentials) => ({ ...prevCredentials, [name]: value }))
    console.log(credentials );  }
  return (
    <div className='auth--container'>
      <div className='form--wrapper'>
      <h1 className='login'>Login</h1>
        <form onSubmit={(e)=> {handleUserLogin(e,credentials)}}>
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
          <label>Password:</label>
                  <input 
                  required
                  type="password"
                  name="password"
                  placeholder="Enter password..."
                  value={credentials.password}
                  onChange={(e) => {handleInputChange(e)}}
                  />
            
          </div>
          <div className="field--wrapper">
             <input className="btn btn--lg btn--main" type="submit" value="login" />
          </div>
        </form>
        <p >Dont have an account ? Register <Link to="/register">here</Link></p>

      </div>
    </div>
  )
}

export default LoginPage