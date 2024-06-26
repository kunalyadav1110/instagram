import React, { useEffect, useState } from "react";
import Slider from "../Components/Slider";
import Suggestions from "../Components/Suggestions";
import axios from "axios";
import FollowData from '../api/follow.json'
import { useNavigate } from "react-router-dom";
import Like from "../FunctionComponents/Like";
import { FaHeart } from "react-icons/fa";
import Messanger from "../Components/Messanger";


function Homepage() {
  const navigate = useNavigate()
  useEffect(()=>{
    if(!localStorage.getItem('username')){
      navigate('/')
    };
    getUsersData()}, [])
  const [usersData, setUsersData] = useState([])
  const [selfdata,setSelfdata] = useState({})
  const getUsersData = ()=>{
    axios.get('http://localhost:5001/api/userdetail').then((res)=> {setUsersData(res.data.data);setSelfdata(res.data.data.filter((i)=>i.username==localStorage.getItem('username'))[0])});
  }
  const postLike = (username,id)=>{
    const user = usersData.filter((i)=>i.username==username)[0]
    const post = user.post.filter((i)=>i._id==id)[0]
    const obj = {
      ...post, likes:[...post.likes, localStorage.getItem('username')]
    } 
    const postList = [...user.post.filter((i)=>i._id !== id),obj]
    axios.put("http://localhost:5001/api/userdetail/" + user._id,{post:postList}).then((res)=>{getUsersData();alert(res)})
  }

  const unLike = (username, id)=>{
    const user = usersData.filter((i)=>i.username==username)[0]
    const post = user.post.filter((i)=>i._id==id)[0]
    const obj = {
      ...post, likes: post.likes.filter((i)=> localStorage.getItem("username") != i)
    }
    const postList = [...user.post.filter((i)=>i._id !== id) , obj]
    axios.put("http://localhost:5001/api/userdetail/" + user._id, {post:postList}).then((res)=>{getUsersData();alert(res)})
  

  }
  const myUsersData = usersData.filter((i)=> i.post.length>0 && i.follower.includes(localStorage.getItem('username'))).map((i)=> i.post).flat()

  const [showStory,setShowStory] = useState(false)
  console.log(usersData)
  return (
    <div className="flex">
      <Slider />
      {/* -z-10 */}
      
      <div className="lg:w-[55%] overflow-x-hidden w-[100%]">
      <div className="flex items-center justify-center gap-4">
        { usersData.map((i)=>
          <div className="flex items-center justify-center gap-4 py-6">
          <div  onClick={()=>setShowStory(!showStory)} className="flex flex-col justify-center items-center cursor-pointer">
            <img src={i.dp} className="h-[60px] w-[60px] rounded-full bg-gray-400 border-[2px] border-orange-400"></img>
            <label className="text-[12px] cursor-pointer">{i.username}</label>
          </div>
        </div>)} 
        </div>
         
        {/* ---------------------------------Post---------------------------------- */}
        <div className="flex flex-col gap-2">
        {console.log(myUsersData)}
        {myUsersData.map((i)=>
        <div className="py-2 lg:w-[55%] w-full flex items-center justify-center m-auto">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-2">
            <div className=" flex gap-2">
            <img src={i.dp} className="h-[30px] w-[30px] rounded-full  border-2 border-orange-500 cursor-pointer"></img>
              <label className="font-semibold text-[15px] cursor-pointer">
                {i.username}
                <span className="text-white bg-blue-500 rounded-full text-[10px] p-[1px]">
                  <i class="fa fa-check" aria-hidden="true"></i>
                </span>{" "}
                . 17h
              </label>
            </div>         
              <div className="pl-[2px]"><i className="fa fa-ellipsis-h text-[20px] cursor-pointer"aria-hidden="true"></i>
              </div>
            </div>
            <img
              className="h-[70vh] rounded-sm"
              src={i.image}
            ></img>
            <div className="flex text-[23px] justify-between">
              <div className="flex gap-4">
              <div onClick={()=>postLike(i.username, i._id)} className="h-[7vh] w-[25%] flex items-center gap-2 pl-[10px] pb-6">
              {i.likes.includes(localStorage.getItem('username')) ?
              <FaHeart onClick={()=>unLike(i.username, i._id)} className="text-[50px] text-red-500"/>:
              <Like onClick={()=>postLike(i.username, i._id)} selfData={selfdata}></Like>}
              
            </div>
                <i
                  class="fa fa-comment-o font-bold cursor-pointer hover:text-gray-400 transition-all"
                  aria-hidden="true"
                ></i>
                <i
                  class="fa fa-paper-plane-o font-bold cursor-pointer hover:text-gray-400 transition-all"
                  aria-hidden="true"
                ></i>
              </div>
              <div className="flex">
                <i
                  class="fa fa-bookmark-o font-bold cursor-pointer hover:text-gray-400 transition-all"
                  aria-hidden="true"
                ></i>
              </div>
            </div>
            <div className="">
              <h5 className="font-medium cursor-pointer">44,802 likes</h5>
              <h3 className="font-medium cursor-pointer">
                rvcjinsta{" "}
                <span className="text-[10px] rounded-full bg-blue-500 text-white p-[1px]">
                  <i class="fa fa-check" aria-hidden="true"></i>
                </span>{" "}
                <span className="font-normal">
                  {i.caption}
                </span>{" "}
              </h3>
              <h3 className="text-gray-400 cursor-pointer">
                View all 157 comments
              </h3>
              <div>
                <input
                  className="border-none outline-none w-[97%]"
                  type="text"
                  placeholder="Add a comment"
                ></input>
                <i
                  className="fa fa-smile-o text-gray-500 cursor-pointer hover:text-gray-400 transition-all"
                  aria-hidden="true"
                ></i>
              </div>
            </div>
          </div>
        </div>)}
        </div>
       
        <div className="flex items-center justify-center flex-col gap-2">
          <div className="h-[1px] w-[55%] bg-gray-400"></div>
          <div className="flex items-center justify-between w-[55%]">
            <h4 className="text-[14px] text-gray-500">Suggested for you</h4>
            <i class="fa fa-times" aria-hidden="true"></i>
          </div>
        </div>
        <div className="h-[105vh] lg:w-[55%] w-full flex items-center justify-center m-auto">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <img src="https://play-lh.googleusercontent.com/DR77tjTRELjjz08osmWgvIFyUvkbQItRf0II8r-eaIzLDOH9YGxSIfIrcToj3IOriyc" className="h-[30px] w-[30px] rounded-full bg-blue-500 border-2 border-orange-500 cursor-pointer"></img>
              <label className="font-semibold text-[15px] cursor-pointer">
                cricbuzz{" "}
                <span className="text-white bg-blue-500 rounded-full text-[10px] p-[1px]">
                  <i class="fa fa-check" aria-hidden="true"></i>
                </span>{" "}
                . 17h
              </label>
              <i
                className="fa fa-ellipsis-h text-[20px] cursor-pointer"
                aria-hidden="true"
              ></i>
            </div>
            <img
              className="h-[70vh] rounded-sm"
              src="https://hindsafari.com/wp-content/uploads/2024/04/img_7661-1.jpg"
            ></img>
            <div className="flex text-[23px] justify-between">
              <div className="flex gap-4">
                <i
                  class="fa fa-heart-o font-bold cursor-pointer hover:text-gray-400 transition-all"
                  aria-hidden="true"
                ></i>
                <i
                  class="fa fa-comment-o font-bold cursor-pointer hover:text-gray-400 transition-all"
                  aria-hidden="true"
                ></i>
                <i
                  class="fa fa-paper-plane-o font-bold cursor-pointer hover:text-gray-400 transition-all"
                  aria-hidden="true"
                ></i>
              </div>
              <div className="flex">
                <i
                  class="fa fa-bookmark-o font-bold cursor-pointer hover:text-gray-400 transition-all"
                  aria-hidden="true"
                ></i>
              </div>
            </div>
            <div className="">
              <h5 className="font-medium cursor-pointer">244,802 likes</h5>
              <h3 className="font-medium cursor-pointer">
                cricbuzz{" "}
                <span className="text-[10px] rounded-full bg-blue-500 text-white p-[1px]">
                  <i class="fa fa-check" aria-hidden="true"></i>
                </span>{" "}
                <span className="font-normal">
                  Indian T20 World Cup Squad for 2024
                </span>{" "}
              </h3>
              <h3 className="text-gray-400 cursor-pointer">
                View all 2024 comments
              </h3>
              <div>
                <input
                  className="border-none outline-none w-[97%]"
                  type="text"
                  placeholder="Add a comment"
                ></input>
                <i
                  className="fa fa-smile-o text-gray-500 cursor-pointer hover:text-gray-400 transition-all"
                  aria-hidden="true"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Suggestions selfData={selfdata} allUserData={usersData} />
      { showStory == true && (
      <div className="w-[100%] h-[100vh] fixed  flex  p-4 bg-black">
      <div className="w-full h-full flex">
      <h1 onClick={()=>setShowStory(false)} className="text-white absolute right-4 cursor-pointer">X</h1>
      <div className="w-[80%] flex  m-auto gap-3">
      <div className=" w-[18%] h-[40vh]  flex m-auto">
            <img className="w-full h-full" src="https://buffer.com/library/content/images/2023/10/free-images.jpg"></img>
          </div>
          <div className=" w-[18%] h-[40vh]  flex m-auto">
            <img className="w-full h-full" src="https://c8.alamy.com/comp/KWDTCW/rajwada-is-a-historical-palace-in-indore-city-india-KWDTCW.jpg"></img>
          </div>
          <div  className="bg-gray-500 flex items-center h-[20px] justify-center m-auto rounded-full w-[20px] cursor-pointer hover:bg-white">
          <i class="fa fa-chevron-left flex items-center justify-center" aria-hidden="true"></i>
          </div>
          <div className=" w-[40%] h-[90vh]  flex m-auto">
            <img className="w-full h-full" src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"></img>
          </div>
          <div className="bg-gray-500 flex items-center h-[20px] justify-center m-auto rounded-full w-[20px] cursor-pointer hover:bg-white">
          <i class="fa fa-chevron-right flex items-center justify-center" aria-hidden="true"></i>
          </div>
          <div className=" w-[18%] h-[40vh]  flex m-auto">
            <img className="w-full h-full" src="https://buffer.com/library/content/images/2023/10/free-images.jpg"></img>
          </div>
          <div className=" w-[18%] h-[40vh]  flex m-auto">
            <img className="w-full h-full" src="https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"></img>
          </div>
          </div>
        </div>
      </div>
        
    )
    
    }
    
    </div>
    
  );
}

export default Homepage;
