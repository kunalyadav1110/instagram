import React from 'react'

function Settings() {
  return (
    <div className='w-[22%] h-[100vh] border-r-2 flex flex-col py-8 gap-2 overflow-scroll'>
        <h1 className='text-[20px] font-bold pl-9'>Settings</h1>
        <div className=' p-4 w-[90%] flex flex-col m-auto gap-3 shadow-xl rounded-xl'>
            <div className='flex items-center gap-2'>
            <i class="fa fa-meanpath" aria-hidden="true"></i>
            <h3 className='font-semibold'>Meta</h3>
            </div>
            <h2 className='font-bold'>Account Center</h2>
            <p className='text-[12px] text-gray-500'>Manage your connected experiences and account settings accross Meta technologies</p>
            <div className='flex items-center gap-3 text-gray-500'>
            <i class="fa fa-user-o" aria-hidden="true"></i>
            <label className='text-[13px]'>Personal Details</label>
            </div>
            <div className='flex items-center gap-3 text-gray-500'>
            <i class="fa fa-shield" aria-hidden="true"></i>
            <label className='text-[13px]'>Password and Security</label>
            </div>
            <div className='flex items-center gap-3 text-gray-500'>
            <i class="fa fa-address-card" aria-hidden="true"></i>
            <label className='text-[13px]'>Ad Preferences</label>
            </div>
        </div>
        <h3 className='pl-9 text-[14px] text-gray-500 font-medium'>How you use Instagram</h3>
        <div className=' w-[80%] m-auto py-2 px-2 flex items-center gap-3 rounded-lg cursor-pointer hover:bg-gray-200'>
        <i class="fa fa-user-circle text-[20px]" aria-hidden="true"></i>
        <label className='cursor-pointer'>Edit Profile</label>
        </div>
        <div className='w-[80%] m-auto py-2 px-2 flex items-center gap-3 rounded-lg cursor-pointer hover:bg-gray-200'>
        <i class="fa fa-bell-o text-[20px]" aria-hidden="true"></i>
        <label className='cursor-pointer'>Notifications</label>
        </div>
        <h3  className='pl-9 text-[14px] text-gray-500 font-medium'>What you see</h3>
        <div className='w-[80%] m-auto py-2 px-2 flex items-center gap-3 rounded-lg cursor-pointer hover:bg-gray-200'>
        <i class="fa fa-bell-slash-o text-[20px]" aria-hidden="true"></i>
        <label className='cursor-pointer'>Muted Accounts</label>
        </div>
        <div className='w-[80%] m-auto py-2 px-2 flex items-center gap-3 rounded-lg cursor-pointer hover:bg-gray-200'>
        <i class="fa fa-heartbeat text-[20px]" aria-hidden="true"></i>
        <label className='cursor-pointer'>Like and Share counts</label>
        </div>
        <h3  className='pl-9 text-[14px] text-gray-500 font-medium'>Who can see your content</h3>
        <div className='w-[80%] m-auto py-2 px-2 flex items-center gap-3 rounded-lg cursor-pointer hover:bg-gray-200'>
        <i class="fa fa-lock text-[20px]" aria-hidden="true"></i>
        <label className='cursor-pointer'>Account Privacy</label>
        </div>
        <div className='w-[80%] m-auto py-2 px-2 flex items-center gap-3 rounded-lg cursor-pointer hover:bg-gray-200'>
        <i class="fa fa-star text-[20px]" aria-hidden="true"></i>
        <label className='cursor-pointer'>Close Friends</label>
        </div>
        <div className='w-[80%] m-auto py-2 px-2 flex items-center gap-3 rounded-lg cursor-pointer hover:bg-gray-200'>
        <i class="fa fa-ban text-[20px]" aria-hidden="true"></i>
        <label className='cursor-pointer'>Blocked</label>
        </div>
        <div className='w-[80%] m-auto py-2 px-2 flex items-center gap-3 rounded-lg cursor-pointer hover:bg-gray-200'>
        <i class="fa fa-eye-slash text-[20px]" aria-hidden="true"></i>
        <label className='cursor-pointer'>Hide story & Likes</label>
        </div>
        <h3  className='pl-9 text-[14px] text-gray-500 font-medium'>How other can interact you</h3>
        <div className='w-[80%] m-auto py-2 px-2 flex items-center gap-3 rounded-lg cursor-pointer hover:bg-gray-200'>
        <i class="fa fa-commenting-o text-[20px]" aria-hidden="true"></i>
        <label className='cursor-pointer'>Messages and story replies</label>
        </div>
        <div className='w-[80%] m-auto py-2 px-2 flex items-center gap-3 rounded-lg cursor-pointer hover:bg-gray-200'>
        <i class="fa fa-at text-[20px]" aria-hidden="true"></i>
        <label className='cursor-pointer'>Tags & mentions</label>
        </div>
        <div className='w-[80%] m-auto py-2 px-2 flex items-center gap-3 rounded-lg cursor-pointer hover:bg-gray-200'>
        <i class="fa fa-comment-o text-[20px]" aria-hidden="true"></i>
        <label className='cursor-pointer'>Comments</label>
        </div>
        <div className='w-[80%] m-auto py-2 px-2 flex items-center gap-3 rounded-lg cursor-pointer hover:bg-gray-200'>
        <i class="fa fa-retweet text-[20px]" aria-hidden="true"></i>
        <label className='cursor-pointer'>Sharing</label>
        </div>
        <div className='w-[80%] m-auto py-2 px-2 flex items-center gap-3 rounded-lg cursor-pointer hover:bg-gray-200'>
        <i class="fa fa-user-times text-[20px]" aria-hidden="true"></i>
        <label className='cursor-pointer'>Restricted</label>
        </div>
        <div className='w-[80%] m-auto py-2 px-2 flex items-center gap-3 rounded-lg cursor-pointer hover:bg-gray-200'>
        <i class="fa fa-krw text-[20px]" aria-hidden="true"></i>
        <label>Hidden words</label>
        </div>
        <h3  className='pl-9 text-[14px] text-gray-500 font-medium'>Your app and media</h3>
        <div className='w-[80%] m-auto py-2 px-2 flex items-center gap-3 rounded-lg cursor-pointer hover:bg-gray-200'>
        <i class="fa fa-download text-[20px]" aria-hidden="true"></i>
        <label className='cursor-pointer'>Archieving and downloading</label>
        </div>
        <div className='w-[80%] m-auto py-2 px-2 flex items-center gap-3 rounded-lg cursor-pointer hover:bg-gray-200'>
        <i class="fa fa-language text-[20px]" aria-hidden="true"></i>
        <label className='cursor-pointer'>Language</label>
        </div>
        <div className='w-[80%] m-auto py-2 px-2 flex items-center gap-3 rounded-lg cursor-pointer hover:bg-gray-200'>
        <i class="fa fa-laptop text-[20px]" aria-hidden="true"></i>
        <label className='cursor-pointer'>Website Permissions</label>
        </div>
        <h3  className='pl-9 text-[14px] text-gray-500 font-medium'>For families</h3>
        <div className='w-[80%] m-auto py-2 px-2 flex items-center gap-3 rounded-lg cursor-pointer hover:bg-gray-200'>
        <i class="fa fa-users text-[20px]" aria-hidden="true"></i>
        <label className='cursor-pointer'>Supervision</label>
        </div>
        <h3  className='pl-9 text-[14px] text-gray-500 font-medium'>For Professionals</h3>
        <div className='w-[80%] m-auto py-2 px-2 flex items-center gap-3 rounded-lg cursor-pointer hover:bg-gray-200'>
        <i class="fa fa-bar-chart text-[20px]" aria-hidden="true"></i>
        <label className='cursor-pointer'>Account type and tools</label>
        </div>
        <h3  className='pl-9 text-[14px] text-gray-500 font-medium'>More info and support</h3>
        <div className='w-[80%] m-auto py-2 px-2 flex items-center gap-3 rounded-lg cursor-pointer hover:bg-gray-200'>
        <i class="fa fa-futbol-o text-[20px]" aria-hidden="true"></i>
        <label className='cursor-pointer'>Help</label>
        </div>
        <div className='w-[80%] m-auto py-2 px-2 flex items-center gap-3 rounded-lg cursor-pointer hover:bg-gray-200'>
        <i class="fa fa-user text-[20px]" aria-hidden="true"></i>
        <label className='cursor-pointer'>Account Status</label>
        </div>
      </div>
  )
}

export default Settings
