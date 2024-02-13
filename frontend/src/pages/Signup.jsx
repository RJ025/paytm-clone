import React, { useState } from 'react'
import axios from "axios"

const Signup = () => {

  const [username , setUsername] = useState("")
  const [password , setPassword] = useState("");
  const [firstname , setFirstname] = useState("")
  const [lastname , setLastname] = useState("");

  const signupUser = async() => {
    const response = await axios.post("http://localhost:3000/api/v1/user/signup" , {
      username ,
      password ,
      firstname ,
      lastname
    })
    localStorage.setItem("token" , response.data.token)
  }

  return (
    <div className='bg-gradient-to-b from-cyan-500 to-blue-500  h-screen pt-56'>
      <div className='p-20 bg-black w-96 rounded-lg mx-auto'>
        <h1 className='font-bold p-2 pb-4 text-3xl text-white'>Sign Up</h1>
        <div className='flex flex-col gap-4'>
          <input 
            placeholder='firstname' 
            type='text'
            value={firstname}
            onChange={(e)=>setFirstname(e.target.value)}
            className='p-2 rounded-md'
          />
          <input 
            placeholder='lastname' 
            type='text'
            value={lastname}
            onChange={(e)=>setLastname(e.target.value)}
            className='p-2 rounded-md'
          />
          <input 
            placeholder='username' 
            type='username'
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            className='p-2 rounded-md'
          />
          <input 
            placeholder='password' 
            type='password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className='p-2 rounded-md'
          />
        </div>
        
        <button className='py-3 bg-black mt-3 text-white w-20 rounded-md border border-white hover:bg-white hover:text-black duration-500' onClick={signupUser}>Sign Up</button>
      </div>
    </div>
    
  )
}

export default Signup