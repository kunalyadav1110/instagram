import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Search({ show, usersData }) {
  useEffect(()=>{getUserDetails()},[])
  const navigate = useNavigate()
    const [search, setSearch] = useState("")
    const [userdetail,setuserdetail] = useState([]);
    const getUserDetails = ()=>{
      axios.get("http://localhost:5001/api/userdetail").then((res)=>setuserdetail(res.data.data))
    }
    const selfData = userdetail.filter((i)=>i.username == localStorage.getItem("username"))
    const putFollowData = (userName, oppositeId)=>{
      const obj = {
        following:[...selfData[0].following, userName]
      }

      const oppositeData = userdetail.filter((i)=>i._id == oppositeId)
    
      const obj2 = {
        follower : [...oppositeData[0]?.follower, selfData[0].username]
      }
      axios.put("http://localhost:5001/api/userdetail/" + selfData[0]._id, obj)
      axios.put("http://localhost:5001/api/userdetail/" + oppositeId , obj2).then(()=>getUserDetails())
  }

  const unFollowData = (userName, oppositeId)=>{
    const obj = {
      following: selfData[0].following.filter((i)=> i !== userName)
    }
    const oppositeData = userdetail.filter((i)=>i._id == oppositeId)
  
    const obj2 = {
      follower :oppositeData[0].follower.filter((i)=> i !== selfData[0].username)
    }
    axios.put("http://localhost:5001/api/userdetail/" + selfData[0]._id,obj)
    axios.put("http://localhost:5001/api/userdetail/" + oppositeId ,obj2).then(()=>getUserDetails())
}
 return (
    <div>
      <div
        style={{ left: show == true ? "4%" : "-50%" }}
        className="w-[30%] bg-white h-[100vh] z-20 flex-col transition-all fixed flex left-[-50%] top-0 rounded-r-2xl shadow-xl"
      >
        <div className="w-full">
          <div className="w-full border-b-[1px] border-gray-400 h-[22vh] px-7">
            <h2 className="text-[25px] py-7   font-bold">Search</h2>
            <div className="px-5 flex items-center  rounded-lg bg-gray-200">
              <i
                className="fa fa-search outline-none border-none"
                aria-hidden="true"
              ></i>
              <input
                className="w-[100%] h-[5vh] p-5 outline-none border-none bg-gray-200 "
                type="text"
                placeholder="Search"
                onChange={(e)=>setSearch(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="">
            <div className="flex justify-between p-5">
              <h2 className="font-semibold">Recent</h2>
              <h2 className="text-blue-500 font-medium cursor-pointer hover:text-black">
                Clear all
              </h2>
            </div>
          </div>
        </div>
        {search==""?
        <div>No recent Search</div>:
        <div className="flex flex-col gap-4 px-4">
          {usersData.filter((i)=> i?.username?.includes(search) || i?.fullName?.includes(search)).map((i) => (
            <div onClick={()=>{localStorage.setItem('userdetail', JSON.stringify(i));navigate('/userpage');window.location.reload() }} className="flex items-center justify-between  gap-14">
              <div className="flex gap-4">
                <div className="">
                  <img
                    src={i?.dp}
                    className="h-[40px] w-[40px] bg-orange-600 rounded-full cursor-pointer"
                  ></img>
                </div>
                <div className="">
                  <h2 className="cursor-pointer font-semibold text-[15px]">
                    {i.username}
                  </h2>
                  <h3 className="text-gray-500 text-[15px]">
                    Suggested for you
                  </h3>
                </div>
              </div>
              <div className="">
              {/* {selfData[0].following.includes(i.username)?
              <h2 onClick={()=>unFollowData(i.username, i._id)} className="text-blue-400 font-semibold text-[15px] cursor-pointer hover:text-gray-500">
                  Following
                </h2>:
                <h2 onClick={()=>putFollowData(i.username, i._id)} className="text-blue-400 font-semibold text-[15px] cursor-pointer hover:text-gray-500">
                  Follow
                </h2>} */}
              </div>
            </div>
          ))}
        </div>}
      </div>
    </div>
  );
}

export default Search;
