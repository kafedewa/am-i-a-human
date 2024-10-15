import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {loading,login} = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email,password);
    }

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>

        
            <h1 className='text-5xl font-semibold text-center'>
                <span >Login</span>
            </h1>
            <h3 className='text-lg text-center mt-4'>
                <span>First we need to know that you’re human</span>
            </h3>

        <div className='w-full p-6 rounded-lg border mt-4'>

            <form onSubmit={handleSubmit}>
                <div>
                    <label className='label pb-2 pl-2 pr-2 pt-0'>
                        <span className='text-base label-text'>Email</span>
                    </label>
                    <input type='text' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-full input input-bordered h-10'/>
                </div>

                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Password</span>
                    </label>
                    <input type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full input input-bordered h-10'/>
                </div>

                <div>
                    <button className="btn btn-block btn-sm mt-4 btn-outline" disabled={loading}>{
                            !loading ? ("Login") : (<span className='loading loading-spinner'/>)
                        }</button>
                </div>

            </form>
            <Link to='/signup' className='text-sm align-middle underline hover:text-gray-400 mt-2 inline-block'>
                {"Dont't"} have an account?
            </Link>
        </div>
    </div>
  )
}

export default Login