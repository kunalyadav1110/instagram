import React, { useEffect, useState } from "react";
import Follow from "../FunctionComponents/Follow";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Suggestions({ selfdata, allUserData }) {
  useEffect(()=>{getAllUserData()}, [])
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [selfData, setSelfData] = useState({})
  const getAllUserData=()=>{
    axios.get("http://localhost:5001/api/userdetail").then((res)=>{
      setSelfData(res.data.data.filter((i)=>i.username == localStorage.getItem("username"))[0])
    })
  }

  const loginCheck = () => {
    let user = allUserData.filter((i) => i.username == phone);
    if (user.length > 0) {
      if (user[0].password == password) {
        localStorage.setItem("username", phone);
        navigate("/homepage");
        window.location.reload();
      } else {
        alert("wrong password");
      }
    } else {
      alert("user not found");
    }
  };
  const [showSwitch, setShowSwitch] = useState(false);
  console.log(selfData)
  return (
    //-z-10
    <div className="lg:flex flex-col gap-5 pt-10 hidden ">
    
      <div className="flex items-center justify-between  gap-14">
        <div className="flex gap-4">
          <div className="">
            <img src={selfdata?.dp}></img>
          </div>
          <div className="">
            <h2 onClick={()=>navigate('/profile')} className="cursor-pointer font-semibold text-[15px]">
              {localStorage.getItem("username")}
            </h2>
            <h3  className="text-gray-500 text-[15px]">{selfdata?.username}</h3>
          </div>
        </div>
        <div className="">
          <h2
            onClick={() => setShowSwitch(!showSwitch)}
            className="text-blue-400 font-semibold text-[15px] cursor-pointer hover:text-black"
          >
            Switch
          </h2>
        </div>
    
      </div>
    
      <div className="flex justify-between">
        <h2 className="text-[14px] text-gray-500 font-semibold">
          Suggested for you
        </h2>
        <label className="text-[12px] cursor-pointer font-medium hover:text-gray-300">
          See All
        </label>
      </div>

    
     {allUserData.filter((i)=> i.username != localStorage.getItem("username") & !(i.follower.includes(localStorage.getItem("username"))) ).map((i)=>
        <div className="flex items-center justify-between  gap-14">
          <div className="flex gap-4">
            <div className="">
              <img
                src={i?.dp}
                className="h-[40px] w-[40px] bg-orange-600 rounded-full cursor-pointer"
              ></img>
            </div>
            <div className="">
              <h2 className="cursor-pointer font-semibold text-[15px]">
                {i?.username}
              </h2>
              <h3 className="text-gray-500 text-[15px]">Suggested for you</h3>
            </div>
          </div>
          <div className="">
            <h2 className="text-blue-400 font-semibold text-[15px] cursor-pointer hover:text-gray-500">
              <Follow selfData={selfData} userData={i}></Follow>
            </h2>
          </div>
        </div>
      )}
      {/* --------------------------------------Switch------------------- */}
      {showSwitch == true && (
        <div className="w-[100%] z-[1000] flex items-center justify-center h-[100vh]  fixed  left-0 top-0">
          <div className="w-[100%] flex items-center bg-black opacity-60 justify-center h-[100vh] fixed left-0 top-0">
            
          </div>
          <div className="flex flex-col items-center  h-[50vh] w-[25%] z-10 gap-5 bg-white rounded-xl">
              <div
                onClick={() => setShowSwitch(false)}
                className="h-[3vh] w-full p-[10px] flex justify-end   text-black"
              >
                <label>X</label>
              </div>
              <img
                className="h-[8vh] w-[40%]"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png"
              ></img>
              <input
                onChange={(e) => setPhone(e.target.value)}
                className="h-[5vh] w-[70%] outline-none border-[1px] border-gray-400 text-[12px] pl-[10px]"
                type="text"
                placeholder="Phone number,email and username"
              ></input>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="h-[5vh] w-[70%] outline-none border-[1px] border-gray-400 text-[12px] pl-[10px]"
                type="password"
                placeholder="Password"
              ></input>
              <label className="pr-[40%] text-[14px]">
                <input type="checkbox"></input> Save login info
              </label>
              <button
                onClick={() => loginCheck()}
                className="h-[4vh] w-[70%] rounded-xl font-semibold bg-blue-400 text-white"
              >
                Log in
              </button>
              <label className="text-[13px]">Forget Password ? </label>
            </div>
        </div>
      )}
    </div>
  );
}

export default Suggestions;
