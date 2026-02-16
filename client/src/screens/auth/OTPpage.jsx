import React from 'react'
import logo from '../../images/logo.webp';
import OTP from '../../components/auth/OTP.jsx';

const OTPpage = () => {
  return (
    <div className='bg-[#F3EAEA] min-h-screen p-4'>
      <img src={logo} alt="logo" className='w-30 h-10' />

      <div className="mt-20">
        <OTP />
      </div>
    </div>
  )
}

export default OTPpage;
