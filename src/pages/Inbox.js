import React, { useEffect, useState } from "react";
import Slider from "../Components/Slider";
import Messanger from "../Components/Messanger";
// import { RiMessengerLine } from "react-icons/ri";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Inbox() {
  useEffect(() => {
    getUserData();
  }, []);
  const navigate = useNavigate();
  const [allUserData, setAllUserData] = useState([]);
  const [selfData, setSelfData] = useState({})
  const [searchUser, setSearchUser] = useState("");
  const getUserData = () => {
    axios
      .get("http://localhost:5001/api/userdetail")
      .then((res) => {setAllUserData(res.data.data); setSelfData(res.data.data.filter((i)=>i.username == localStorage.getItem("username"))[0])});
  };
  const [msgPopUp, setMsgPopUp] = useState(false);

  const userData = JSON.parse(sessionStorage.getItem("msg"));
  const [showSend,setShowSend] = useState(false)

  // --------------------Send Message---------------------------
  const [msg, setMsg] = useState("")

  const sendMsgFn = ()=>{
    const selfObj = {
      messages: [...selfData.messages, {
        username: userData.username,
        message:{
          by: selfData.username,
          msg: msg,
          time: new Date()
        }
      }]
    }
    axios.put("http://localhost:5001/api/userdetail/"+ selfData._id, selfObj)

    const userObj ={
      messages: [...userData.messages, {
        username: selfData.username,
        message:{
          by: selfData.username,
          msg:msg,
          time: new Date()
        }
      }]
    }
    axios.put("http://localhost:5001/api/userdetail/"+ userData._id, userObj).then((res)=>{
      setMsg("");
      getUserData()
    })
  }
  // -----------------------------------Message Show--------------------------
  const allMsg = selfData.messages 
  console.log(userData)

  return (
    <div className="flex">
      <Slider></Slider>
      <Messanger selfData={selfData} allUserData={allUserData}></Messanger>
      {sessionStorage.getItem("msg") ? (
        <div className="w-[60%] ">

          <div className="h-[10vh] w-[60%] fixed border flex items-center justify-between p-5 bg-white">
            <div className="flex items-center gap-2 ">
              <img
                className="w-[50px] h-[50px] rounded-full cursor-pointer"
                src={userData?.dp}
              ></img>
              <h2 className="cursor-pointer">{userData?.username}</h2>
            </div>
            <div className="flex gap-3 text-[25px]">
              <i class="fa fa-phone cursor-pointer" aria-hidden="true"></i>
              <i
                class="fa fa-video-camera cursor-pointer"
                aria-hidden="true"
              ></i>
              <i
                class="fa fa-info-circle cursor-pointer"
                aria-hidden="true"
              ></i>
            </div>
          </div>
          <div className="flex items-center justify-center flex-col h-[85vh]  gap-3">
            <img
              className="h-[100px] w-[100px]  rounded-full"
              src={userData?.dp}
            ></img>
            <h1 className="text-[25px] font-semibold">{userData?.fullName}</h1>
            <h2 className="text-gray-500">{userData?.username}.instagram</h2>
            <button
              onClick={() => {
                localStorage.setItem("userdetail", JSON.stringify(userData));
                navigate("/userpage");
              }}
              className="h-[4vh] w-[15%] bg-gray-200 rounded-lg font-semibold"
            >
              View Profile
            </button>
            {console.log(userData)}
            
          </div>
          <div className="flex flex-col gap-4 items-start px-5 py-2 mb-12 ">
          {allMsg?.filter((i)=>i.username == userData.username).map((i)=>
            <label style={{alignSelf: i.message.by == i.username ? 'flex-start' : 'flex-end'}} className="px-4 py-2 bg-blue-500 rounded-[50px] text-white">{i?.message?.msg}</label>)}
          </div>
          <div className="flex items-center justify-center  fixed w-[55%] border-[2px]  border-gray-300 right-8 bottom-4 rounded-full ml-5 bg-white ">
            <div className="  ">
              <i
                class="fa fa-smile-o fa-2x rounded-l-2xl h-[5vh] cursor-pointer  flex items-center justify-center pl-3"
                aria-hidden="true"
              ></i>
            </div>
            <input
            onChange={(e)=>setMsg(e.target.value)} onClick={()=>setShowSend()}
              type="text"
              className=" w-[80%] h-[5vh]  pl-5 outline-none"
            ></input>
            
            <div className="h-[5vh] w-[10%]  flex gap-3 items-center rounded-r-2xl">
            {showSend == "" ?
            <div className="flex gap-3">
              <i
                class="fa fa-microphone fa-lg cursor-pointer"
                aria-hidden="true"
              ></i>
              <i
                class="fa fa-picture-o fa-lg cursor-pointer"
                aria-hidden="true"
              ></i>
              <i
                class="fa fa-heart-o fa-lg cursor-pointer"
                aria-hidden="true"
              ></i>
              </div>:
              <div>
              <label  onClick={()=>sendMsgFn()} >Send</label></div>}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center m-auto h-[100vh]  gap-1">
          <div className="h-[80px] w-[80px] rounded-full  border-[2px] border-black  flex  justify-center items-center text-[40px]">
            {/* <RiMessengerLine /> */}
          </div>
          <h1 className="text-[23px]">your messages</h1>
          <p className="text-gray-500">Send a message to start the chat</p>
          <button
            onClick={() => setMsgPopUp(true)}
            className="h-[4vh] w-[60%] bg-blue-500 text-white rounded-lg "
          >
            Sent Message
          </button>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {msgPopUp == true && (
        <div className="w-[100%] flex fixed items-center justify-center h-[100vh]">
          <div
            onClick={() => setMsgPopUp(false)}
            className="w-[100%] flex items-center left-0 justify-center h-[100vh] bg-black fixed opacity-60"
          >
            <h1 className="absolute right-5 top-5 text-white cursor-pointer">
              X
            </h1>
          </div>
          <div className="flex z-10 relative flex-col items-center  h-[65vh] w-[35%] bg-white rounded-xl">
          <div className="flex h-[8vh] items-center justify-center border-b w-full">
            <h1 className="font-bold">New Message</h1>
            <label  onClick={() => setMsgPopUp(false)} className="absolute right-4 font-bold">X</label>
          </div>
            <div className="flex gap-10 w-full py-2 px-3 border-b">
              <label className="font-bold">To: </label>
              <input
                onChange={(e) => {
                  setSearchUser(e.target.value);
                }}
                className="w-[80%] outline-none border-none " placeholder="Search..."
              ></input>
            </div>
            {searchUser == "" ? (
              <h1 className="absolute left-4 top-32 ">No account found</h1>
            ) : (
              <div className="flex flex-col w-full">
                {allUserData
                  .filter((i) => i.username.includes(searchUser))
                  .map((i) => (
                    <div
                      onClick={() =>
                        sessionStorage.setItem("msg", JSON.stringify(i))
                      }
                      className="h-[8vh] w-[100%]  flex   justify-between px-4"
                    >
                      <div className="w-[50%] h-[7vh] flex items-center gap-3 ">
                        <img
                          className="w-[45px] h-[45px] border-[2px] rounded-full "
                          src={i.dp}
                        ></img>
                        <div className="flex flex-col ">
                          <label className="font-semibold">{i.username}</label>
                          <label className="text-gray-500 text-[12px]">
                            {i.fullName}
                          </label>
                        </div>
                      </div>
                      <div className="w-[50%] h-[7vh] flex justify-end  items-center">
                        {/* {selfData[0].following.includes(i.username) ? ( */}
                      </div>
                    </div>
                  ))}
              </div>
            )}
            <button className="w-[90%] rounded-lg text-white h-[7vh] bg-blue-500 bottom-3 absolute font-semibold">chat</button>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default Inbox;
