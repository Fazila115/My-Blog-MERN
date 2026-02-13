import React from 'react'
import background from '../../images/register.webp';
import { Form } from 'antd';
import ProfileAvatar from '../../components/local/Avatar';

const Signup = () => {
  return (
    <div className='bg-[#F3EAEA] min-h-screen'>
      <div className="flex w-full h-screen">
        {/* left box */}
        <div className="w-1/2 h-full">
          <Form className='bg-white m-6 p-4'>
<h1>Register</h1>
<ProfileAvatar/>
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
