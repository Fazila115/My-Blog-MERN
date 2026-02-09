import React from 'react'
import Loader from '../../components/local/Loader';

const LandingPage = () => {
  return (
    <div className='bg-[#F3EAEA] min-h-screen'>
        <Loader/>
      <h1 className='text-white'>hello</h1>
        <h1 className='text-[#9C6B5C]'>hello</h1>
        <h1 className='text-[#A67C6F]'>hello</h1>
        <h1>hello</h1>

      <button className="bg-[#E88966] hover:bg-[#D97654] text-white px-6 py-2 rounded">
    Publish
  </button>

  <div className="bg-[#EBC7B8]">box1</div>
  <div className="bg-[#F6E3DC]">box2</div>

  
    </div>
  )
}

export default LandingPage;
