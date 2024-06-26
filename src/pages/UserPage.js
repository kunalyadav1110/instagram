
import React, { useEffect, useState } from "react";
import Slider from "../Components/Slider";
import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { useNavigate } from "react-router-dom";
import Unfollow from "../FunctionComponents/Unfollow";
import Follow from "../FunctionComponents/Follow";

function Userpage() {
  const userInfo = JSON.parse(localStorage.getItem("userdetail"));
  const [showDiv, setShowDiv] = useState(false);
  const [showDiv1, setShowDiv1] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    getSelfData();
  }, []);
  const [selfData, setSelfData] = useState({});
  const [Userpage, setUserpage] = useState(false);
  const getSelfData = () => {
    axios
      .get("http://localhost:5001/api/userdetail")
      .then((res) =>
        setSelfData(
          res.data.data.filter(
            (i) => i.username == localStorage.getItem("username")
          )[0]
        )
      );
  };
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

  const handleChange = (e) => {
    const image = e.target.files[0];
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
            axios
              .put("http://localhost:5001/api/userdetail/" + selfData._id, {
                dp: url,
              })
              .then(() => {
                alert("Successfully");
                getSelfData();
              });
          });
      }
    );
  };

  const removeDp = () => {
    axios
      .put("http://localhost:5001/api/userdetail/" + selfData._id, {
        dp: "none",
      })
      .then(() => {
        getSelfData();
        alert("Done");
      });
  };

  return (
    <div className="flex">
      <Slider></Slider>
      
      <div className="w-[100%] flex flex-col items-center  h-[100vh] bg-[white] pl-[100px] ">
        <div className="w-[90%] h-[30vh] flex  justify-center items-center ">
          <div className="w-[25%]   ">
            <img
              className="w-[140px] h-[140px] rounded-full"
              src={userInfo.dp}
            ></img>
          </div>
          <div className="w-[60%] flex flex-col   gap-4">
            <div className="w-[100%] flex gap-4 items-center">
              <label className="text-[18px] font-medium">
                {" "}
                {userInfo.username}
              </label>
              {selfData?.following?.includes(userInfo.username) ? (
                <div
                  onClick={() => setShowDiv1(!showDiv1)}
                  className="w-[22%] h-[5vh] bg-gray-300 rounded-md flex items-center justify-center border text-[14px] font-semibold cursor-pointer gap-2"
                >
                  <label>Following</label>
                  <i class="fa fa-chevron-down" aria-hidden="true"></i>
                </div>
              ) : (
                <div className="bg-[#0095F6] text-white px-4 py-[6px] rounded-[10px]">
                  <Follow selfData={selfData} userData={userInfo}></Follow>
                </div>
              )}
              <div className="w-[17%] h-[5vh] bg-gray-300 rounded-md flex items-center justify-center border text-[14px] font-semibold cursor-pointer">
                messages
              </div>
              <div className="w-[5%] h-[5vh] bg-gray-300 rounded-md flex items-center justify-center border text-[14px] font-semibold cursor-pointer">
                <i class="fa fa-user-plus" aria-hidden="true"></i>
              </div>

              <div
                onClick={() => setShowDiv(!showDiv)}
                className="h-[5vh] w-[7%] bg- white flex items-center justify-center gap-1"
              >
                <div className="h-[5px] w-[5px] bg-black rounded-full"></div>
                <div className="h-[5px] w-[5px] bg-black rounded-full"></div>
                <div className="h-[5px] w-[5px] bg-black rounded-full"></div>
              </div>
            </div>
            <div className="w-[60%] flex justify-between">
              <label>
                <span className="font-semibold">{userInfo.post.length}</span>{" "}
                posts
              </label>
              <label>
                <span className="font-semibold">
                  {userInfo?.follower?.length}
                </span>{" "}
                followers
              </label>
              <label>
                <span className="font-semibold">
                  {userInfo?.following?.length}
                </span>{" "}
                following
              </label>
            </div>
            <div className="h-[7vh] w-[70%] flex flex-col">
              {/* <label>DEEPIKA</label> */}
              <div className="h-[5vh] w-[60%] flex gap-3 items-center">
                <label className=" text-gray-400  ">
                  {" "}
                  followed by{" "}
                  {userInfo.follower.map((i) => (
                    <span className="text-black ">{i}, </span>
                  ))}
                </label>
                <div className="h-[20px] w-[20px] rounded-full "></div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[70%] h-[15vh] flex items-center gap-12 ">
          <div className="flex items-center justify-center flex-col  ">
            <div className="w-[80px] h-[80px] rounded-full border bg-yellow-100"></div>
            <label>.</label>
          </div>

          <div className="flex items-center justify-center flex-col ">
            <div className="w-[80px] h-[80px] rounded-full border  bg-yellow-100"></div>
            <label>.</label>
          </div>

          <div className="flex items-center justify-center flex-col ">
            <div className="w-[80px] h-[80px] rounded-full border  bg-yellow-100"></div>
            <label>.</label>
          </div>

          <div className="flex items-center justify-center flex-col ">
            <div className="w-[80px] h-[80px] rounded-full border  bg-yellow-100"></div>
            <label>.</label>
          </div>

          <div className="flex flex-col items-center justify-center gap-1">
            <div className="w-[80px] h-[80px] rounded-full border flex items-center justify-center">
              <label className="text-[40px] text-gray-400 ">+</label>
            </div>
            <label className="text-[13px] font-semibold">.</label>
          </div>
        </div>

        <div className="w-[80%]  mt-7 flex items-center pr-[20px]">
          <div className="w-[100%] h-[1px] bg-gray-400 "></div>
        </div>
        <div className="w-[70%] flex items-center justify-center  pt-[20px] ">
          <div className="flex items-center justify-center gap-2  pr-[100px]">
            <i class="fa fa-th text-[12px]" aria-hidden="true"></i>
            <label className="text-[13px]">POST</label>
          </div>

          <div className="flex  items-center justify-center gap-2 pr-[100px] ">
            <i class="fa fa-bookmark-o text-[12px]" aria-hidden="true"></i>
            <label className="text-[13px]"> SAVED</label>
          </div>
        </div>
        <div className=" w-[80%] h-[40vh] grid grid-cols-3 gap-4">
          {userInfo.post.map((i) => (
            <img className="h-full w-full" src={i.image}></img>
          ))}
        </div>
      </div>
      {/* ----------------------------------------------Remove------------------------------*/}
      {showDiv && (
        <div className="w-[100%] flex items-center justify-center h-[100vh]  fixed ">
          <div
            onClick={() => setShowDiv(false)}
            className="w-[100%] flex items-center justify-center h-[100vh] bg-black opacity-80"
          >
            <h1
              onClick={() => setShowDiv(false)}
              className="absolute right-5 top-5 text-white cursor-pointer"
            >
              X
            </h1>
           
          </div>
          <div className="flex flex-col items-center fixed  h-[49vh] w-[30%]  bg-white rounded-xl">
              <h3 className="h-[7vh] w-full bg-white  flex items-center justify-center text-red-400 border-b-2 border-gray-400 rounded-lg cursor-pointer">
                Block
              </h3>
              <h3 className="h-[7vh] w-full bg-white flex items-center justify-center text-red-400 border-b-2  border-gray-400 cursor-pointer">
                Restrict
              </h3>
              <h3 className="h-[7vh] w-full bg-white flex items-center justify-center text-red-400 border-b-2  border-gray-400 cursor-pointer">
                Report
              </h3>
              <h3 className="h-[7vh] w-full bg-white flex items-center justify-center text-black border-b-2  border-gray-400 cursor-pointer">
                Share to...
              </h3>
              <h3 className="h-[7vh] w-full bg-white flex items-center justify-center text-black border-b-2  border-gray-400 cursor-pointer">
                About this Account
              </h3>
              <h3 className="h-[7vh] w-full bg-white flex items-center justify-center text-black border-b-2  border-gray-400 cursor-pointer">
                Remove follower
              </h3>
              <h3 className="h-[7vh] w-full bg-white flex items-center justify-center text-black border-b-2  border-gray-400 rounded-lg cursor-pointer">
                Cancel
              </h3>
            </div>
        </div>
      )}
      {/* ----------------------------------Unfollow------------------------------  */}
      {showDiv1 && (
        <div className="w-[100%] flex items-center justify-center h-[100vh] fixed ">
          <div
            onClick={() => setShowDiv1(false)}
            className="w-[100%] flex items-center fixed bg-black opacity-75 justify-center h-[100vh]"
          ></div>
          <div className="flex flex-col items-center z-10  h-[50vh] w-[25%]  bg-white rounded-xl">
            <h1
              onClick={() => setShowDiv1(false)}
              className=" text-black  cursor-pointer left-40  top-3 relative"
            >
              X
            </h1>

            <div className="h-[16vh] w-full bg-white  flex flex-col items-center justify-center  ">
              <img
                className="h-[7vh] w-[15%] rounded-full"
                src={userInfo.dp}
              ></img>
              <label>{userInfo.username}</label>
            </div>
            <div className="h-[7vh] w-[100%] bg-white flex justify-between items-center  p-[20px]  rounded-lg cursor-pointer">
              <h3>Add to close friends list</h3>
              <i class="fa fa-star" aria-hidden="true"></i>
            </div>

            <div className="h-[7vh] w-[100%] bg-white flex justify-between items-center  p-[20px] rounded-lg cursor-pointer ">
              <h3> Add to favorites</h3>
              <i class="fa fa-star-o" aria-hidden="true"></i>
            </div>

            <div className="h-[7vh] w-[100%] bg-white flex justify-between items-center p-[20px] rounded-lg cursor-pointer ">
              <h3>Mute</h3>
              <i class="fa fa-arrow-right" aria-hidden="true"></i>
            </div>

            <div className="h-[7vh] w-[100%] bg-white flex justify-between items-center p-[20px] rounded-lg cursor-pointer ">
              <h3>Restrict</h3>
              <i class="fa fa-arrow-right" aria-hidden="true"></i>
            </div>

            <div className="h-[7vh] w-[100%] bg-white flex justify-between items-center p-[20px] rounded-lg cursor-pointer ">
              <Unfollow selfData={selfData} userData={userInfo}></Unfollow>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Userpage