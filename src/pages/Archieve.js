import React from 'react'
import Slider from '../Components/Slider'
import { useNavigate } from 'react-router-dom'
import FollowData from '../api/follow.json'
function Archieve() {
    const navigate = useNavigate()
  return (
    <div className='flex'>
      <Slider></Slider>
      <div className='py-9 px-24 w-full flex flex-col gap-10'>
        <h1 onClick={()=>navigate('/profile')} className='text-[22px] cursor-pointer'><i class="fa fa-arrow-left" aria-hidden="true"></i> Archive</h1>
        <div className='flex items-center justify-center border-b-2 gap-2 pb-4'>
        <i class="fa fa-circle-o-notch cursor-pointer" aria-hidden="true"></i>
        <h3 className='cursor-pointer'>STORIES</h3>
        </div>
        <p className='text-[13px] text-gray-500'>Only you can see your archived stories unless you choose to share them.</p>
        <div className='w-full flex flex-wrap gap-5'>
           {FollowData.map((i)=>
             <div className='w-[265px] h-[60vh] bg-red-400 hover:scale-[1.03] transition-all cursor-pointer'>
              <img className='w-full h-full' src={i.post}></img>
            </div>)}
        </div>
      </div>
    </div>
  )
}

export default Archieve
