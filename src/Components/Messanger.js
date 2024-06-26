import React, { useState } from 'react'
import FollowData from '../api/follow.json'
function Messanger({selfData,allUserData}) {
    const [Messanger, setMessanger] = useState([])
    const messageUsers = selfData.messages
    const uniqueData = messageUsers?.filter((item, index, self) => 
      index === self.findIndex(t => t.username === item.username)
    );
  
    
    
  return (
    <div className='w-[25%]  '>
    
      <div
        // style={{ left: show == true ? "3%" : "-50%" }}
        className="w-[25%] bg-white h-[100vh] flex-col transition-all fixed flex top-0 rounded-r-2xl shadow-xl"
      >
        <div className="w-full flex flex-col gap-3 overflow-scroll">
          
          <div className="">
            <div className="flex justify-between pt-10 px-6 items-center">
              <h2 className="font-bold text-[22px]">kunal<i class="fa fa-angle-down" aria-hidden="true"></i></h2>
              <i class="fa fa-pencil-square-o font-semibold cursor-pointer text-[25px]" aria-hidden="true"></i>
            </div>
          </div>
          <div className="">
            <div className="flex justify-between pt-10 px-6 items-center">
              <h2 className="font-bold text-[16px]">Messages</h2>
              <h2 className='font-semibold text-[16px] text-blue-500 cursor-pointer'>Request(1)</h2>
            </div>
          </div>
          
          { uniqueData?.map((i)=>
            <div onClick={()=>{sessionStorage.setItem("msg", JSON.stringify(allUserData.filter((j)=>j.username == i.username)[0])); window.location.reload()}} className='flex px-6 py-3 items-center gap-5 cursor-pointer hover:bg-gray-100'>
            <img className='h-[50px] rounded-full w-[50px]' src={allUserData.filter((j)=>i.username == j.username)[0].dp}></img>
            <div className=''>
              <h2>{i?.username}</h2>
              <h3>{i.message.by == selfData.username ? "" : "You"} {i?.message?.msg} </h3>
            </div>
          </div>)}
        </div>
        
      </div>
    </div>
  )
}

export default Messanger
