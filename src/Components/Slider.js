import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import axios from "axios";
import Search from "./Search";
import { useNavigate } from "react-router-dom";
import Messanger from "./Messanger";
import Notifications from "./Notifications";
import Inbox from "../pages/Inbox";


function Slider() {
  useEffect(() => {
    getUserDetails();
  }, []);
  const [showCreate, setShowCreate] = useState(false);
  const [uploadStep, setUploadStep] = useState(0);
  const [showSearch, setShowSearch] = useState(false)
  const [showProfile,setshowProfile] = useState(false)
  const [showMessanger, setShowMessanger] = useState(false)
  const [showNotifications, setShownotifications] = useState(false)
  const [showMore,setShowMore] = useState(false)

  const navigate = useNavigate()
 
  
  const firebaseConfig = {
    apiKey: "AIzaSyDuobxWGMQq6WTFnlJsZkfL2w-SgkfmGaM",
    authDomain: "instagram-eb2e3.firebaseapp.com",
    projectId: "instagram-eb2e3",
    storageBucket: "instagram-eb2e3.appspot.com",
    messagingSenderId: "606910640753",
    appId: "1:606910640753:web:d40313cc5c30db961e21d0",
    measurementId: "G-SE70WF8BGQ",
  };

  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();

  const [caption, setCaption] = useState("");
  const [url, setUrl] = useState("");
  const handleChange = (e) => {
    const image = e.target.files[0];
    setUploadStep(1);
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
          });
      }
    );
  };

  const [userInfo, setUserInfo] = useState([]);
  const [allUserData, setAllUserData] = useState([])
  const getUserDetails = () => {
    axios.get("http://localhost:5001/api/userdetail").then(
      (res) => {
        setUserInfo(
          res.data.data.filter(
            (i) => i.username == localStorage.getItem("username")
          )
        );
        setAllUserData(res.data.data)
      },
      () => {}
    );
  };

  const putPostData = () => {
    const obj = {
      post: [
        ...userInfo[0].post,
        {
          image: url,
          caption: caption,
          likes: 0,
          comment: 0,
          shares: 0,
          username:userInfo[0].username
        },
      ],
    };
    axios
      .put("http://localhost:5001/api/userdetail/" + userInfo[0]._id, obj)
      .then((res) => alert(JSON.stringify(res)));
  };
 
  return (
    <div className="w-[16%] z-[200] lg:block hidden">
    <div className="w-[16%] z-10 border-r-[1px] border-solid border-gray-300 h-[100vh] flex flex-col gap-5 fixed">
      {/* <h1 className='p-5 text-[25px] font-bold cursor-pointer '>Instagram</h1> */}
      {/* <h1 className='p-5 text-[25px] font-bold cursor-pointer '>Instagram</h1> */}
      <img
      style={{display: showSearch==true && "none"}}
        src="https://logodix.com/logo/14876.png"
        className="p-5 text-[25px] font-bold cursor-pointer h-[100px] w-[200px]"
      ></img>
      <i style={{display: showSearch==false && "none"}}
            className="fa fa-instagram text-[25px] h-[100px] w-[200px] hover:bg-gray-100 p-3 cursor-pointer rounded-lg"
            aria-hidden="true"
          ></i>

      <div onClick={()=>navigate('/homepage')} className="flex items-center pl-5 gap-3 h-[50px] cursor-pointer  hover:bg-[#F2F2F2]">
        <i className="fa fa-home text-[25px]" aria-hidden="true"></i>

        <label style={{display: showSearch==true && "none"}} className="text-lg font-semibold cursor-pointer pl-[4px]">Home</label>
      </div>
      <div onClick={()=>setShowSearch(!showSearch)} className="flex items-center pl-5 gap-3 h-[50px] cursor-pointer hover:bg-[#F2F2F2]">
        <i className="fa fa-search text-[25px]" aria-hidden="true"></i>
        <label style={{display: showSearch==true && "none"}} className="text-lg font-semibold cursor-pointer pl-[4px]">Search</label>
      </div>
      <div className="flex items-center pl-5 gap-3 h-[50px] cursor-pointer hover:bg-[#F2F2F2]">
        <i className="fa fa-compass text-[25px]" aria-hidden="true"></i>
        <label style={{display: showSearch==true && "none"}} className="text-lg font-semibold cursor-pointer pl-[6px]">Explore</label>
      </div>
      <div className="flex items-center pl-5 gap-3 h-[50px] cursor-pointer hover:bg-[#F2F2F2]">
        <i class="fa fa-play-circle text-[25px]" aria-hidden="true"></i>
        <label style={{display: showSearch==true && "none"}} className="text-lg font-semibold cursor-pointer pl-[7px]">Reels</label>
      </div>
      <div onClick={()=> {navigate('/inbox')}} className="flex items-center pl-5 gap-3 h-[50px] cursor-pointer hover:bg-[#F2F2F2]">
        <i class="fa fa-commenting-o text-[25px]" aria-hidden="true"></i>
        <label style={{display: showSearch==true && "none"}} className="text-lg font-semibold cursor-pointer pl-[4px]">Messages</label>
      </div>
      <div onClick={()=>setShownotifications(!showNotifications)} className="flex items-center pl-5 gap-3 h-[50px] cursor-pointer hover:bg-[#F2F2F2]">
        <i class="fa fa-heart-o text-[25px]" aria-hidden="true"></i>
        <label style={{display: showSearch==true && "none"}} className="text-lg font-semibold cursor-pointer pl-[4px]">Notifications</label>
      </div>
      <div
        onClick={() => setShowCreate(true)}
        className="flex items-center pl-5 gap-3 h-[50px] cursor-pointer hover:bg-[#F2F2F2]"
      >
        <i class="fa fa-plus-square-o text-[25px]" aria-hidden="true"></i>
        <label style={{display: showSearch==true && "none"}} className="text-lg font-semibold cursor-pointer pl-[8px]">Create</label>
      </div>
      <div onClick={()=>navigate('/profile')}  className="flex items-center pl-5 gap-3 h-[50px] cursor-pointer hover:bg-[#F2F2F2]">
        <i class="fa fa-user text-[25px]" aria-hidden="true"></i>
        <label style={{display: showSearch==true && "none"}} className="text-lg font-semibold cursor-pointer pl-[8px]">Profile</label>
      </div>
      <div className="flex justify-end flex-col h-[200px] gap-1">
      {/* <div onClick={()=>{localStorage.removeItem('username');navigate('/')}} className="flex items-center pl-5 gap-3 h-[50px] cursor-pointer hover:bg-[#F2F2F2]">
          <i class="fa fa-at text-[25px]" aria-hidden="true"></i>
          <label style={{display: showSearch==true && "none"}} className="text-lg font-semibold cursor-pointer">
            Log out
          </label>
        </div> */}
        <div className="flex items-center pl-5 gap-3 h-[50px] cursor-pointer hover:bg-[#F2F2F2]">
          <i class="fa fa-at text-[25px]" aria-hidden="true"></i>
          <label style={{display: showSearch==true && "none"}} className="text-lg font-semibold cursor-pointer pl-[4px]">
            Threads
          </label>
        </div>
        <div onClick={()=>setShowMore(!showMore)} className="flex items-center pl-5 gap-3 h-[50px] cursor-pointer hover:bg-[#F2F2F2]">
          <i class="fa fa-bars text-[25px]" aria-hidden="true"></i>
          <label className="text-lg font-semibold cursor-pointer pl-[4px]">More</label>
        </div>
      </div>
      {showCreate == true && (
        <div className="h-[100vh] w-[100%]  top-0 left-0 fixed flex justify-center items-center z-[100000] ">
          <div
            onClick={() => setShowCreate(false)}
            className="w-[100%] h-[100vh] fixed  flex justify-end p-4 bg-black opacity-50 "
          >
            <div className="absolute text-white text-[28px] font-bold">X</div>
          </div>
          {uploadStep == 0 ? (
            <div className="bg-white w-[33%] h-[75vh] rounded-lg  relative flex flex-col items-center">
              <div className="border-b w-full text-center py-3 font-semibold">
                Create new post
              </div>
              <div className="flex-col flex items-center justify-center h-full gap-4">
                <i
                  className="fa fa-picture-o text-[60px]"
                  aria-hidden="true"
                ></i>
                <h2 className="text-[22px]">Drag Photos and videos here</h2>
                <input
                  className="bg-blue-500"
                  placeholder="Select from computer"
                  onChange={(e) => handleChange(e)}
                  type="file"
                ></input>
              </div>
            </div>
          ) : uploadStep == 1 ? (
            <div className="bg-white w-[33%] h-[75vh] rounded-lg  relative flex flex-col items-center">
              <div className=" w-full flex justify-between px-4 text-center py-4 border-b-2 border-black">
                <label
                  onClick={() => setUploadStep(0)}
                  className="font-bold cursor-pointer"
                >
                  Back
                </label>
                <label className="font-medium">Crop</label>
                <label
                  className="text-blue-500 hover:text-black cursor-pointer font-medium"
                  onClick={() => setUploadStep(2)}
                >
                  Next
                </label>
              </div>

              <img className="h-full" src={url}></img>
            </div>
          ) : (
            <div className="bg-white w-[60%] h-[75vh] rounded-lg  relative flex flex-col items-center ">
              <div className="flex items-center justify-between w-full px-4">
                <h2
                  onClick={() => setUploadStep(1)}
                  className="font-bold cursor-pointer"
                >
                  back
                </h2>
                <div className="border-b w-full text-center py-4 font-medium">
                  Create a new post
                </div>
                <h2
                  onClick={() => putPostData()}
                  className="font-bold text-blue-500 cursor-pointer"
                >
                  Share
                </h2>
              </div>
              <div className="flex w-full h-full">
                <img className="w-[60%]" src={url}></img>
                <div className="w-[40%]">
                  <textarea
                    onChange={(e) => setCaption(e.target.value)}
                    className="w-full h-[35vh]"
                    placeholder="Caption"
                  ></textarea>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {/* -------------------------------ShowMore------------------------------- */}
      {showMore==true && 
      <div className="h-[55vh] w-[17%] bg-white fixed top-[38%] left-4 rounded-2xl shadow-xl flex flex-col gap-3">
        <div className="p-2">
          <div onClick={()=>navigate('/editprofile')} className="flex items-center p-3 cursor-pointer hover:bg-gray-100 rounded-lg gap-3">
          <i class="fa fa-cog" aria-hidden="true"></i>
          <h3>Settings</h3>
          </div>
          <div className="flex items-center p-3 cursor-pointer hover:bg-gray-100 rounded-lg gap-3">
          <i class="fa fa-line-chart" aria-hidden="true"></i>
          <h3>Activity</h3>
          </div>
          <div className="flex items-center p-3 cursor-pointer hover:bg-gray-100 rounded-lg gap-3">
          <i class="fa fa-bookmark-o" aria-hidden="true"></i>
          <h3>Saved</h3>
          </div>
          <div className="flex items-center p-3 cursor-pointer hover:bg-gray-100 rounded-lg gap-3">
          <i class="fa fa-sun-o" aria-hidden="true"></i>
          <h3>Switch Appearance</h3>
          </div>
          <div className="flex items-center p-3 cursor-pointer hover:bg-gray-100 rounded-lg gap-3">
          <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
          <h3>Report a Problem</h3>
          </div>
        </div>
        <div className="py-2 px-3">
        <div className="flex items-center p-3 cursor-pointer hover:bg-gray-100 rounded-lg gap-3 border-b-2">
          <h3>Switch Account</h3>
          </div>
          <div onClick={()=>{localStorage.removeItem('username');navigate('/')}} className="flex items-center p-3 cursor-pointer hover:bg-gray-100 rounded-lg gap-3">
          <h3>Log Out</h3>
          </div>
        </div>
      </div>
      }
    </div>
    {/* ---------------------------Transparent DIv-------------------------- */}
    {/* <div onClick={()=>setShowSearch(false)} className="w-full h-full fixed top-0 left-0"></div> */}
   {/* --------------------------------search-------------------- */}
    <Search show={showSearch} usersData={allUserData}></Search> 
    {/* ----------------------------------Notifications-------------------- */}
    <Notifications show={showNotifications} usersData={allUserData}></Notifications>
    {/* <Messanger usersData={allUserData}></Messanger> */}
    </div>
  );
}

export default Slider;
