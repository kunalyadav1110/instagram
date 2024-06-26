import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  useEffect(() => {
    getUsersData();
  }, []);
  const [mobile, setMobile] = useState(0);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const logIn = () => {
    navigate("/");
  };
  const [usersDetails, setUsersDetails] = useState([]);
  const userNames = usersDetails.map((i) => i.username);
  const getUsersData = () => {
    axios
      .get("http://localhost:5001/api/userdetail")
      .then((res) => setUsersDetails(res.data.data));
  };

  const [mobileValidation, setMobileValidation] = useState(true);
  const [usernameValidation, setusernameValidation] = useState(true);

  const signUp = () => {
    if (String(mobile).length == 10) {
      if (!userNames.includes(username)) {
        const obj = {
          username: username,
          password: password,
          fullName: fullName,
          mobile: mobile,
        };
        axios.post("http://localhost:5001/api/userdetail", obj).then(
          (res) => {
            console.log(JSON.stringify(res));
          },
          (err) => {
            alert(err);
          }
        );
        navigate("/homepage");
      } else {
        setusernameValidation(false);
      }
    } else {
      setMobileValidation(false);
    }
  };
  return (
    <div className="h-[135vh] flex items-center justify-center flex-col gap-5">
      <div className="h-[90vh] w-[23%] border-[1px] border-solid border-gray-300 flex items-center flex-col px-10 gap-4 justify-center">
        <img
          src="https://logodix.com/logo/14876.png"
          className="h-[60px] "
        ></img>
        <h3 className="text-center font-semibold text-gray-500">
          Sign up to see photos and videos from your friends.
        </h3>
        <button className="w-[100%] bg-blue-400 rounded-md h-[35px] text-white font-medium">
          <i class="fa fa-facebook-official" aria-hidden="true"></i> Login in
          with Facebook
        </button>
        <div className="flex w-[100%] items-center gap-5">
          <div className="h-[1px] w-[100%] bg-gray-500"></div>
          <label>OR</label>
          <div className="h-[1px] w-[100%] bg-gray-500"></div>
        </div>
        <div className="flex w-[100%] flex-col gap-3">
          <div className="flex items-center relative">
            <input
              onChange={(e) => setMobile(e.target.value)}
              className="border-[1px] w-full border-solid border-black h-[35px] pl-3 text-[13px] bg-[#FAFAFA]"
              type="text"
              placeholder="Mobile Number or Email"
            ></input>
            <div
              style={{
                visibility: mobileValidation == true ? "hidden" : "visible",
              }}
              className="w-6 right-2 h-6 rounded-full border border-red-500 flex items-center justify-center absolute"
            >
              <label>x</label>
            </div>
          </div>
          <input
            onChange={(e) => setFullName(e.target.value)}
            className="border-[1px] border-solid border-black h-[35px] pl-3 text-[13px] bg-[#FAFAFA]"
            type="text"
            placeholder="Full Name"
          ></input>
          <div className="flex items-center relative">
            <input
              onChange={(e) => setUsername(e.target.value)}
              className="border-[1px] border-solid border-black w-full h-[35px] pl-3 text-[13px] bg-[#FAFAFA]"
              type="text"
              placeholder="Username"
            ></input>
            <div
              style={{ visibility: usernameValidation == true ? "hidden" : "visible", }}
              className="w-6 right-2 h-6 rounded-full border border-red-500 flex items-center justify-center absolute"
            >
              <label>x</label>
            </div>
          </div>
          <div className="flex items-center relative">
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="border-[1px] w-full border-solid border-black h-[35px] pl-3 text-[13px] bg-[#FAFAFA]"
              type="password"
              placeholder="Password"
            ></input>
            <div
              style={{ visibility: "hidden" }}
              className="w-6 right-2 h-6 rounded-full border border-red-500 flex items-center justify-center absolute"
            >
              <label>x</label>
            </div>
          </div>
        </div>
        <p className="text-[12.5px] text-center text-gray-400">
          People who use our service may have uploaded your contact information
          to Instagram.
          <span className="text-blue-800 cursor-pointer">Learn More</span>
        </p>
        <p className="text-[12.5px] text-center text-gray-400">
          By signing up, you agree to our Terms ,{" "}
          <span className="text-blue-800 cursor-pointer">Privacy Policy</span>{" "}
          and{" "}
          <span className="text-blue-800 cursor-pointer">Cookies Policy</span> .
        </p>
        <button
          onClick={() => signUp()}
          className="w-[100%] bg-blue-400 rounded-md h-[35px] text-white font-medium cursor-pointer"
        >
          Sign up
        </button>
      </div>
      <div className="h-[10vh] w-[23%] border-[1px] border-solid border-gray-300 flex items-center justify-center">
        <h3>
          Have an account?{" "}
          <span
            onClick={() => logIn()}
            className="text-blue-500 font-medium cursor-pointer"
          >
            Log in
          </span>
        </h3>
      </div>
      <h3>Get the app.</h3>
      <div className="flex gap-3">
        <img
          className="h-[40px]"
          src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png"
        ></img>
        <img
          className="h-[40px]"
          src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png"
        ></img>
      </div>
      <div className="flex gap-4">
        <button className="text-[13px] text-gray-500 hover:underline">
          Meta
        </button>
        <button className="text-[13px] text-gray-500 hover:underline">
          About
        </button>
        <button className="text-[13px] text-gray-500 hover:underline">
          Blog
        </button>
        <button className="text-[13px] text-gray-500 hover:underline">
          Jobs
        </button>
        <button className="text-[13px] text-gray-500 hover:underline">
          Help
        </button>
        <button className="text-[13px] text-gray-500 hover:underline">
          API
        </button>
        <button className="text-[13px] text-gray-500 hover:underline">
          Privacy
        </button>
        <button className="text-[13px] text-gray-500 hover:underline">
          Terms
        </button>
        <button className="text-[13px] text-gray-500 hover:underline">
          Location
        </button>
        <button className="text-[13px] text-gray-500 hover:underline">
          Instagram Lite
        </button>
        <button className="text-[13px] text-gray-500 hover:underline">
          Threads
        </button>
        <button className="text-[13px] text-gray-500 hover:underline">
          Contact Uploading & Non-Users
        </button>
        <button className="text-[13px] text-gray-500 hover:underline">
          Meta Verified
        </button>
      </div>
      <div className="flex gap-4 text-[13px] text-gray-500">
        <select>
          <option>English</option>
          <option>Hindi</option>
          <option>Russian</option>
          <option>Spanish</option>
        </select>
        <p>© 2024 Instagram from Meta</p>
      </div>
    </div>
  );
}

export default SignUp;
