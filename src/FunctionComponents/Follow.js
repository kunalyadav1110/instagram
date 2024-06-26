import axios from 'axios'
import React from 'react'

function Follow({selfData,userData}) {
    const followFn=()=>{
        const selfObj = {
            following:[...selfData.following,userData.username]
        }
        axios.put("http://localhost:5001/api/userdetail/"+selfData._id,selfObj)
        const userObj = {
            follower:[...userData.follower,selfData.username]
        }
        axios.put("http://localhost:5001/api/userdetail/"+userData._id,userObj).then(()=>{window.location.reload()})
    }
  return (
    <div onClick={()=>followFn()}>
      Follow
    </div>
  )
}

export default Follow
