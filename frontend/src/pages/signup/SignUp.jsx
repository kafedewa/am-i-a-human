import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup';

const SignUp = () => {

    const [inputs, setInputs] = useState({
        fullName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
    });

    const {loading, signup} = useSignup();

    const handleCheckboxChange = (gender) => {
        setInputs({ ...inputs, gender });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); //stops page from refreshing
        await signup(inputs);
    };

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <h1 className='text-5xl font-semibold text-center'>
                <span >Create Account</span>
            </h1>
            <h3 className='text-lg text-center mt-4'>
                <span>First we need to know that you’re human</span>
            </h3>

            <div className='w-full pl-6 pr-6 mt-4'>

            <form onSubmit={handleSubmit}>
                <div>
                    <label className='label pb-2 pl-2 pr-2 pt-0'>
                        <span className='text-base label-text'>Full Name</span>
                    </label>
                    <input type='text' placeholder='John Doe' className='w-full input input-primary'
                        value={inputs.fullName}
                        onChange={(e) => setInputs({...inputs, fullName: e.target.value})}/>
                </div>

                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Email</span>
                    </label>
                    <input type='text' placeholder='jdoe@jdoe.com' className='w-full input input-primary '
                        value={inputs.email}
                        onChange={(e) => setInputs({...inputs, email: e.target.value})}/>
                </div>

                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Username</span>
                    </label>
                    <input type='text' placeholder='Username' className='w-full input input-primary '
                    value={inputs.username}
                    onChange={(e) => setInputs({...inputs, username: e.target.value})}/>
                </div>

                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Password</span>
                    </label>
                    <input type='password' placeholder='Password' className='w-full input input-primary '
                    value={inputs.password}
                    onChange={(e) => setInputs({...inputs, password: e.target.value})}/>
                </div>

                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Confirm Password</span>
                    </label>
                    <input type='password' placeholder='Confirm Password' className='w-full input input-primary '
                    value={inputs.confirmPassword}
                    onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}/>
                </div>

                <div>
                    <button className="btn btn-block mt-4 btn-outline" disabled={loading}>{
                         !loading ? ("Create Account") : (<span className='loading loading-spinner'/>)
                     }</button>
                </div>

            </form>

            <Link to='/login' className='text-sm link-center underline hover:text-gray-400 mt-2 inline-block'>
                Already have an account?
            </Link>
        </div>
    </div>
  )
}

export default SignUp