import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'

const GET_USERNAME = 'GET_USERNAME'
const GET_USERFAILED = 'GET_USERFAILED'

const REMOVE_USER = 'REMOVE_USER'
const EDIT_USER = 'EDIT_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}
const targetuser = {}
/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})

const getUsername = user => ({type: GET_USERNAME, user})
const getnamefailed = error =>({type:GET_USERFAILED, error})

const removeUser = () => ({type: REMOVE_USER})
const editUser = user => ({type: EDIT_USER, user})

/**
 * THUNK CREATORS
 */

export const fetchSingleUser = userId => async dispatch => {
  const res = await axios.get(`/api/users/${userId}`);
  const user = res.data[0];
  dispatch(getUser(user));
} 

export const fetchUserFromID = username => async dispatch => {
  const tempres = await axios.get(`/api/users/`);
  const error = "Search Failed ! Maybe there was a typo?"
  console.log(tempres.data[0]);

  for (var i = 0; i < tempres.data.length; i++) {
    if (username == tempres.data[i].userName  ){
      const res = await axios.get(`/api/users/${i+1}`);
      const targetuser = res.data[0];
      dispatch(getUser(targetuser));
      history.push(`/profileviewer/${targetuser.id}`)
    }
  }  
} 

export const updateUser = (updateInfo, id) => async dispatch => {
  try {
    const res = await axios.put(`/api/users/${id}`, updateInfo)
    const user = res.data;
    dispatch(editUser(user[0]));
  } catch (error) {
    console.log(error)
  }
}

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    if(res.data.accountSetUp === false) {
      history.push('/updateuser')
    } else {
      history.push('/home')
    }
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case GET_USERNAME:
      return action.user
    case GET_USERFAILED:
      return action.error
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
