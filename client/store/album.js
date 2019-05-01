import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALBUM = 'GET_ALBUM'
const GET_USERS_ALBUMS = 'GET_USERS_ALBUMS'
/**
 * INITIAL STATE
 */
const defaultAlbums = {}

/**
 * ACTION CREATORS
 */

 

const getAlbum = album => ({type: GET_ALBUM, album})

/**
 * THUNK CREATORS
 */

export const fetchsingleAlbum = albumId => async dispatch => {
  dispatch(getAlbum(targetuser));
} 

export const fetchAlbumByName = albumName => async dispatch => {
  let album
  try {
    album = await axios.get(`/api/albums/${albumName}`);
    dispatch(getAlbum(album.data));
  } catch (error) {
    console.log("Problem fetching album named " + albumName)
    console.log(error);
  }
}
 
export const createNewAlbum = (albumInfo) => async dispatch => {
  let album
  try {
    album = await axios.post('/api/albums/', albumInfo);
    
    dispatch(getAlbum(album.data))
  } catch (albumCreateError) {
    console.log("problem creating new album! x_x")
    console.log(albumCreateError);
  }
}

export const fetchUserAlbums = userId => async dispatch => {
  let res;
  try {

    res = await axios.get('/api/albums');
    const albums = res.data
    const userAlbums = albums.filter((album) => {
      return (album.owner == userId && typeof album!== 'undefined')
    })
  {
    dispatch(getAlbum(userAlbums))}
  } catch (error) {
    console.log('Problem fetching albums from user # ' + userId );
    console.log(error);
  }
}

/**
 * REDUCER
 */
export default function albums (state = defaultAlbums, action) {
  switch (action.type) {
    case GET_ALBUM:
      return action.album
    case GET_USERS_ALBUMS:
      return action.album
    default:
      return state
  }
}
