import { Button, Form, Input } from 'antd';
import React from 'react'
import { FaArrowLeft } from "react-icons/fa";

const OTP = () => {
    return (
        <div className='w-2/4 mx-auto text-center'>
            <div className='flex justify-center gap-2'>
                <FaArrowLeft className='mt-3 text-gray-600'/>
                <h1 className='text-3xl font-bold text-[#9C6B5C]'>Enter OTP</h1>
            </div>

            <h2 className='text-gray-600'>Enter 6-digit code to verify Email</h2>

            <Form className='mt-6'>
                <Input.OTP maxLength={6} className='otp mt-4 font-bold' size='large'></Input.OTP>
                <h2 className='mt-4 text-gray-500'>Didn't Receive the code? <button className='ml-1 font-bold text-lg text-gray-600'>Resend</button></h2>
                <Button size='large' className='mt-4 bg-[#E88966] text-white p-6 rounded-full hover:text-[#E88966]'
                 style={{ borderColor: '#E88966'}}>
    Verify</Button>
            </Form>
        </div>
    )
}

export default OTP
