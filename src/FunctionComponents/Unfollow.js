import axios from 'axios'
import React from 'react'

function Unfollow({selfData,userData}) {
    const UnfollowFn=()=>{
        const selfObj = {
            following:selfData.following.filter((i)=>i !== userData.username)
        }
        axios.put("http://localhost:5001/api/userdetail/"+selfData._id,selfObj)
        const userObj = {
            follower: userData.follower.filter((i)=>i!==selfData.username)
        }
        axios.put("http://localhost:5001/api/userdetail/"+userData._id,userObj).then(()=>{window.location.reload()})
    }
  return (
    <div onClick={()=>UnfollowFn()}>
      Unfollow
    </div>
  )
}

export default Unfollow
