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
            <h4>{user.email} </h4>
          </li>
          <li>
            <h4>User since {user.createdAt.slice(0,10)} </h4>
          </li>
        </ul>
      </div> 
    </div>
  )
}

export default UserCard