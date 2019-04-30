import axios from 'axios'
 
/**
 * INITIAL STATE
 */
const defaultPhotos = {}

/**
 * ACTION TYPES
 */
const GET_PHOTOS = "GET_PHOTOS"
const GET_ALBUM_PHOTOS = "GET_ALBUM_PHOTOS"

/**
 * ACTION CREATORS
 */
const getPhotos = photos => ({type: GET_PHOTOS, payload: photos})
 /**
 * THUNK CREATORS
 */
export const getAllPhotos = () => async dispatch => {
    try {
        const res = await axios.get('/api/photo/')
        const allPhotos = res.data;
        dispatch(getPhotos(allPhotos))
    } catch (error) {
        console.log("erro fetching all photos")
        console.log(error)
    }
}

export const getPhotosByAlbum = (albumId) => async dispatch => {
    try {
        const res = await axios.get('/api/photo/')
        const allPhotos = res.data;
        const albumPhotos = allPhotos.filter((photo) => {
            return (photo.albumId == albumId)
        })
        dispatch(getPhotos(albumPhotos))
    } catch (error) {
        console.log("erro fetching photos from album id # " + albumId)
        console.log(error)
    }
}


/**
 * REDUCER
 */
export default function photo (state = defaultPhotos, action) {
    switch(action.type) {
        case GET_PHOTOS:
            return action.payload
        default:
            return state
    }
}