import React from 'react'
import {Link} from 'react-router-dom'

const UserCard = props => {
  const {user} = props;
  return(
    <div>
      
      <a>{user.firstName} {user.lastName}</a>
      <img src={user.profilePicture} width="100" height="100"/>
      
    </div>
  )
}

export default UserCard