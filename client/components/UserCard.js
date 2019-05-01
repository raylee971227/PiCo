import React from 'react'
import {Link} from 'react-router-dom'

const UserCard = props => {
  const {user} = props;
  var today = new Date();

  return(
    <div>
      
      
      <img id="profileimage" src={user.profilePicture} width= '33%' height="33%"/>
      <div id="profiledetails">
        
        <ul>
          <li>
            <h3> Email : {user.email} </h3>
          </li>
          <li>
            <h3> Account created on : {user.createdAt.slice(0,10)} </h3>
          </li>
        </ul>
      </div> 
    </div>
  )
}

export default UserCard