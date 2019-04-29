import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALBUM = 'GET_ALBUM'

/**
 * INITIAL STATE
 */
const defalbums = {}

/**
 * ACTION CREATORS
 */

const getAlbum = album =>     ({type: GET_ALBUM, album})

/**
 * THUNK CREATORS
 */
export const fetchsingleAlbum = userId => async dispatch => {
  dispatch(getAlbum(targetuser));
} 

/**
 * REDUCER
 */
export default function albums (state = defalbums, action) {
  switch (action.type) {
    case GET_ALBUM:
      return action.album
    default:
      return state
  }
}
