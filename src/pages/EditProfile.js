import React from 'react'
import Slider from '../Components/Slider'
import Settings from '../Components/Settings'

function EditProfile() {
  return (
    <div className='flex '>
      <Slider></Slider>
      <Settings></Settings>
      <div className='h-[100vh] w-[60%] m-auto flex flex-col p-9 gap-5 overflow-scroll'>
        <h1 className='text-[20px] font-bold'>Edit Profile</h1>
        <div className='h-[10vh] w-[90%] bg-gray-200 rounded-xl flex items-center justify-between px-5 py-5'>
        <div className='flex items-center gap-4'>
            <img className='h-[50px] rounded-full cursor-pointer' src='https://image.winudf.com/v2/image1/bmV0LndsbHBwci5ib3lzX3Byb2ZpbGVfcGljdHVyZXNfc2NyZWVuXzZfMTY2NzUzNzYyMV8wMzQ/screen-6.jpg?fakeurl=1&type=.jpg'></img>
            <h3 className='font-bold'>kunal</h3>
            </div>
            <button className='bg-blue-400 text-white font-semibold h-[5vh] w-[130px] rounded-xl'>Change photo</button>
        </div>
        <div className='w-[90%] flex flex-col gap-4'>
            <h3 className='font-bold'>Website</h3>
            <div className='w-full h-[6vh] bg-gray-200 flex items-center pl-5 rounded-xl text-gray-500 cursor-not-allowed'>Website</div>
            <p className='text-[12px] text-gray-500'>Editing your links is only available on mobile. Visit the Instagram app and edit your profile to change the websites in your bio.</p>
        </div>
        <div className='w-[90%] flex flex-col gap-4'>
            <h3 className='font-bold'>Bio</h3>
            <input type='text' className='w-full h-[8vh] border-[1px] rounded-xl'></input>
        </div>
        <div className='w-[90%] flex flex-col gap-4'>
            <h3 className='font-bold'>Gender</h3>
            <select className='w-full h-[8vh] border-[1px] rounded-xl px-5 cursor-pointer'>
                <option>Prefer Not To Say</option>
                <option>Male</option>
                <option>Female</option>
            </select>
            <p  className='text-[12px] text-gray-500'>This won't be part of your public profile.</p>
        </div>
        <div className='w-[90%] flex flex-col gap-4'>
            <h3 className='font-bold'>Show account suggestions on profiles</h3>
            <div className='w-full h-[12vh] border-[1px] rounded-xl px-5 flex items-center'>
                <div>
                    <h4>Show account suggestions on profiles</h4>
                    <p className='text-[12px] text-gray-500 w-[80%]'>Choose whether people can see similar account suggestions on your profile, and whether your account can be suggested on other profiles.</p>
                </div>
                <input className='cursor-pointer' type='checkbox'></input>
            </div>
        </div>
        <div className='flex justify-end w-[90%]'>
        <button className='w-[45%] h-[6vh] bg-blue-300 rounded-xl text-white font-medium'>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
