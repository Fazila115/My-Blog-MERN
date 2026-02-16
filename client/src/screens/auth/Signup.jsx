import React from 'react'
import background from '../../images/register.webp';
import { Button, Checkbox, Form, Input } from 'antd';
import ProfileAvatar from '../../components/local/Avatar';
import logo from '../../images/logo.webp';

const Signup = () => {
  return (
    <div className='bg-[#F3EAEA] min-h-screen'>
      <div className="flex w-full h-screen">
        {/* left box */}
        <div className="w-1/2 h-full p-4">
          <h1 className='text-[#9C6B5C] font-bold text-3xl text-center'>Register</h1>
          <a><img src={logo} alt="logo"  className='w-30 h-10'/></a>

          <Form className=' p-2'>
            <div className="text-center">  <ProfileAvatar /></div>

            <div className="flex items-center gap-3 mt-4">
              {/* first name */}
              <Form.Item className='w-1/2'>
                <Input placeholder='First Name' className='signupInput' />
              </Form.Item>

              {/* last name */}
              <Form.Item className='w-1/2'>
                <Input placeholder='Last Name' className='signupInput' />
              </Form.Item>
            </div>

            {/* email */}
            <Form.Item >
              <Input type='email' placeholder='Email Address' className='signupInput' />
            </Form.Item>

            {/* phone number */}
            <Form.Item >
              <Input type='number' placeholder='Phone Number' className='signupInput' />
            </Form.Item>

            <div className="flex items-center gap-3">
              {/*passowrd */}
              <Form.Item className='w-1/2'>
                <Input.Password placeholder='Password' className='signupInput' />
              </Form.Item>

              {/* confirm password */}
              <Form.Item className='w-1/2'>
                <Input.Password placeholder='Confirm Password' className='signupInput' />
              </Form.Item>
            </div>

            {/* checkbox */}
            <Form.Item>
                <Checkbox className="signupInput " />
                <span className="text-sm ml-2">
                  By checking this box and proceeding with registration, I acknowledge that I have read, understood, and agree to be bound by the
                  <a href='/privacy-policy' className='text-[#D97654] hover:text-[#D97650]'> Privacy Policy.</a>
                </span>
            </Form.Item>

            {/* submit button */}
            <Button size='large' className='btn'>Register</Button>

            <p className='text-center mt-8'>Already have an account? <a href='/login' className='text-[#D97654] hover:text-[#D97650]'>Login</a></p>
          </Form>
        </div>

        {/* right box */}
        <div className="w-1/2 h-full text-center pt-28"
          style={{ backgroundImage: `url(${background})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat', }}>
          <h1 className='text-amber-800 text-3xl font-bold' >Share Your Voice with the World</h1>
          <p className='text-amber-700 text-lg'>Register now and turn your thoughts into powerful stories.</p>
        </div>
      </div>

    </div>
  )
}

export default Signup;
