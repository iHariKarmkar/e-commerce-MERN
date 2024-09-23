import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const {token, setToken, navigate, backendURL} = useContext(ShopContext);
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if(currentState === 'Sign Up'){
        // Call SignUp API
        const payload = {
          name,
          email,
          password
        }
        const response = await axios.post(backendURL + "/api/user/register", payload );
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        }
        else {
          toast.error(response.data.message)
        }
      }
      else {
        // Call Login API
        const response = await axios.post(backendURL + '/api/user/login', {email, password});
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success(response.data.message);
          setEmail('')
          setPassword('');
        }
        else {
          toast.error(response.data.message);
        }
      }
      
    } catch (error) {
      
    }
  }

  useEffect(() => {
    if(token){
      navigate('/');
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90% sm:max-w-96 m-auto mt-14 gap-4 text-gray-800]">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800 " />
      </div>
      {currentState === 'Sign Up' && <input
      onChange={(e) => setName(e.target.value)}
        type="text"
        value={name}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Name"
        required
      />}
      <input
      onChange={(e) => setEmail(e.target.value)}
        type="email"
        value={email}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
      />
      <input
      onChange={(e) => setPassword(e.target.value)}
        type="password"
        value={password}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {
          currentState === 'Login'
          ? <p className="cursor-pointer" onClick={() => setCurrentState('Sign Up')}>Create account</p>
          : <p className="cursor-pointer" onClick={() => setCurrentState('Login')}>Login Here</p>

        }
      </div>
      <button className="w-full bg-black text-white font-light px-8 py-2 mt-4">{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  );
};

export default Login;