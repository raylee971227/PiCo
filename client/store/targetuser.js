import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */


const GET_USERNAME = 'GET_USERNAME'
const GET_TARGETUSER = 'GET_TARGETUSER'

/**
 * INITIAL STATE
 */
const targetUser = {}

/**
 * ACTION CREATORS
 */

const getTargetUser = targetuser => ({type: GET_TARGETUSER, targetuser})
const getUsername = targetuser => ({type: GET_USERNAME, targetuser})

/**
 * THUNK CREATORS
 */

export const fetchTargetUser = userId => async dispatch => {
  console.log('debug');

  const res = await axios.get(`/api/users/${userId}`);
  const targetuser = res.data[0];
  dispatch(getTargetUser(targetuser));
} 

export const fetchUserFromID = username => async dispatch => {
  const tempres = await axios.get(`/api/users/`);
  let errorflag = true;

  for (var i = 0; i < tempres.data.length; i++) {
    if (username == tempres.data[i].userName  ){
      const res = await axios.get(`/api/users/${i+1}`);
      const targetuser = res.data[0];
      console.log(targetuser);
      dispatch(getUsername(targetuser));
      history.push(`/profileviewer/${targetuser.id}`);
      errorflag = false;
      break;
    }
  }  
  if (errorflag){ alert( "Search Failed ! Maybe there was a typo?")}
} 

/**
 * REDUCER
 */
export default function targetuser (state = targetUser, action) {
  switch (action.type) {
    case GET_USERNAME:
      return action.targetuser
    case GET_TARGETUSER:
      return action.targetuser
    default:
      return state
  }
}
