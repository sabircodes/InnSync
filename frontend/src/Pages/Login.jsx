import axios from 'axios';
import  { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import {  UserContext } from '../UserContext';

const Login = () => {
  const [email , SetEmail] = useState('');
  const [password ,SetPassword] = useState('');
  const navigate = useNavigate();
  const {SetUser} = useContext(UserContext);

  async function loginhandler(e){
    e.preventDefault();
    try{
    const {data} = await axios.post('/login',{
      email,
      password
    }
    );
    SetUser(data);
    alert('Login successful');
    navigate('/');
  }catch(e){
    alert('Please check your username and password and try again later!!');
  }


  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-32 border-2 rounded-2xl p-8 shadow-md shadow-gray-400">
            <h1 className='text-4xl text-center mb-4'>Login</h1>
            <form className='max-w-md mx-auto' onSubmit={loginhandler}>
                <input type="email" placeholder="your@email" value={email} onChange={e=>{SetEmail(e.target.value)}}/>
                <input type="password" placeholder="Password" value={password} onChange={e=>{SetPassword(e.target.value)}}/>
                <button className="primary">Login</button>
            </form>
            <div className='text-center py-2 text-gray-600'>
            Don't have an account yet?
            <Link to="/register" className="underline text">
                Register Now

            </Link>
        </div>
        </div>
        
    </div>
  )
}

export default Login