import React, { useState } from 'react'

const Signin = () => {

  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("");


  return (
    <div className='bg-gradient-to-b from-cyan-500 to-blue-500  h-screen pt-56'>
      <div className='p-20 bg-black w-96 h-96  rounded-lg  mx-auto'>
        <h1 className='font-bold p-2 pb-4 text-3xl text-white'>Sign in</h1>
        <div className='flex flex-col gap-4'>
          <input 
            placeholder='email' 
            type='email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
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
        
        <button className='py-3 bg-black mt-3 text-white w-20 rounded-md border border-white hover:bg-white hover:text-black duration-500'>Sign in</button>
      </div>
    </div>
    
  )
}

export default Signin