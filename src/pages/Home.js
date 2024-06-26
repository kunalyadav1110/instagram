import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import UserDetails from '../api/userdetails.json'
import { useNavigate } from 'react-router-dom'
function Home() {
    useEffect(()=>{getUserDetail()}, [])
    const navigate = useNavigate()
    const [ username,setUsername] = useState("")
    const [ password,setPassword] = useState("")
    const [UserDetails, setUserDetails] = useState([])
    const getUserDetail = ()=>{
        axios.get("http://localhost:5001/api/userdetail").then((res)=>{setUserDetails(res.data.data)})
    }
    
    const logincheck = ()=>{
        let user = UserDetails.filter((i)=>i.username == username)
        if(user.length>0){
           if(user[0].password == password){
            localStorage.setItem("username", username)
            navigate('/homepage')
           }
           else{
            alert("wrong password")
           }
        }
        else{
            alert("user not found")
        }
    }

    const signUp = ()=>{
        navigate('/signup')
    }

  return (
    <div className='h-[100vh] w-[100%]'>
    <div className='h-[90vh]  flex items-center justify-center gap-3'>
    <div className='h-[75vh] w-[25%] '>
    {/* <img className='h-[75vh] w-[100%]' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh4r9K3TkRCwPOi5HY4ezTPJoNfuaGcCKbmoCMBK0YSQ&s'></img> */}
    <img className='h-[75vh] w-[100%] object-cover' src='https://images.ctfassets.net/az3stxsro5h5/NjZUwfga63k7mTZCeKhvH/2cbcc7fa1e907b0a9d37155077c253f8/Nov1-What_to_Post_on_Instagram_When_You_re_Fresh_Out_of_Ideas-Newsletter-Feature-FL'></img>
    </div>
    <div className='h-[90vh] w-[23%] flex items-center justify-center flex-col gap-4'>
    <div className='h-[50vh] w-[100%]  flex items-center justify-center flex-col gap-5 border-[1px] border-solid'>
        <h1 className='text-[35px] py-3'>Instagram</h1>
        <input  onChange={(e)=>setUsername(e.target.value)}className='border-[1px] border-solid w-[80%] h-[40px] rounded-sm bg-[#FAFAFA] pl-2' type='email' placeholder='Phone Number, username, or email'></input>
        <input onChange={(e)=>setPassword(e.target.value)} className='border-[1px] border-solid w-[80%] h-[40px] rounded-sm bg-[#FAFAFA] pl-2' type='password' placeholder='Password'></input>
        <button onClick={()=>logincheck()} className='w-[80%] border-[1px] border-solid rounded-lg h-[35px] bg-[#4CB5F9]'>Log in</button>
        <div className='flex items-center justify-center gap-2'>
            <div className='h-[1px] w-[130px] bg-black'></div>
            <label>OR</label>
            <div className='h-[1px] w-[130px] bg-black'></div>
        </div>
        <div className='flex gap-2 justify-center items-center'>
        <i className="fa fa-facebook-official text-[#385185] text-[20px]" aria-hidden="true"></i>
        <h2 className='text-[#385185] text-[15px]'>Log in with facebook</h2>
        </div>
        <h5 className='text-[13px]'>Forgot password?</h5>
    </div>
    <div className='h-[10vh] w-[100%] border-[1px] border-solid flex items-center justify-center'>
        <h2>Don't have an account?<span onClick={()=>signUp()} className='text-blue-600 font-medium cursor-pointer'> Sign up</span></h2>
    </div>
    <h2>Get the app.</h2>
    <div className='flex w-[100%] h[10vh] justify-center items-center gap-2'>
    <img className='h-[5vh] w-[120px]' src='https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png'></img>
    <img className='h-[5vh] w-[100px]' src='https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png'></img>
    </div>
    </div>
    
    </div>
    <div className='h-[3vh] w-[100%] flex justify-center items-center gap-4 text-gray-600 text-[13px] '>
        <button className='text-[13px] hover:underline'>Meta</button>
        <button className='text-[13px] hover:underline'>About</button>
        <button className='text-[13px] hover:underline'>Blog</button>
        <button className='text-[13px] hover:underline'>Jobs</button>
        <button className='text-[13px] hover:underline'>Help</button>
        <button className='text-[13px] hover:underline'>API</button>
        <button className='text-[13px] hover:underline'>Privacy</button>
        <button className='text-[13px] hover:underline'>Terms</button>
        <button className='text-[13px] hover:underline'>Location</button>
        <button className='text-[13px] hover:underline'>Instagram Lite</button>
        <button className='text-[13px] hover:underline'>Threads</button>
        <button className='text-[13px] hover:underline'>Contact Uploading & non users</button>
        <button className='text-[13px] hover:underline'>Meta Verified</button>
    </div>

    </div>
  )
}

export default Home
