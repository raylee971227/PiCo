import axios from 'axios'
 
/**
 * INITIAL STATE
 */
const defaultPhotos = {}

/**
 * ACTION TYPES
 */
const GET_PHOTOS = "GET_PHOTOS"
const DELETE_PHOTOS = "DELETE_PHOTOS"

/**
 * ACTION CREATORS
 */
const getPhotos = photos => ({type: GET_PHOTOS, payload: photos})
const deletePhotos = photos => ({type: DELETE_PHOTOS, payload: photos})
 /**
 * THUNK CREATORS
 */
export const deletePhotoById = (photoId) => async dispatch => {
    try {
        const response = await axios.put(`/api/photo/delete/`+photoId);
        const res = response.data
        // console.log('delete photo log')
        // console.log(res)
        dispatch(deletePhotos(res))
    } catch (error) {
        console.error(error);
    }
}

export const deletePhotoByAlbum = albumId => async dispatch => {
    try {
        const response = await axios.put(`/api/photo/deletealbum/${albumId}`);
        dispatch(response.data)
    } catch (error) {
        console.error(error)
    }
}

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
        case DELETE_PHOTOS:
            return action.payload
        default:
            return state
    }
}