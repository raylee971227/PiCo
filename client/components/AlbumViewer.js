import React, {Component} from 'react';
import {connect} from 'react-redux';
import PhotoCard from './PhotoCard'
import {getPhotosByAlbum, getAllPhotos} from '../store/photo';
import {fetchAlbumById, deleteAlbum} from '../store/album';
// import {fetchSingleUser} from '../store/user';

import history from '../history'


class AlbumViewer extends Component {
    constructor() {
        super()
        this.onDelete = this.onDelete.bind(this)
    }
    async componentDidMount() {
        await this.props.getAlbumInfo(this.props.match.params.id)
        await this.props.getAlbumPhotos(this.props.match.params.id)
    }
    
    onDelete() {
        this.props.deleteAlbumById(this.props.match.params.id);
        
    }

    render() {
        // if(this.props.user.id == this.props.album.owner) {
        //    console.log('you are indeed the owner') 
        // }
        const arr = Object.values(this.props.photos)
        return(
            <div>
                <div>
                    <a>{this.props.album.description}</a>
                </div>
                <div>
                    {(this.props.user.id == this.props.album.owner)?(<button onClick={this.onDelete}>Delete Album</button>):(null)}
                </div>
                <div>
                    {(arr.map((photo) => {
                        return (<PhotoCard photo={photo}/>)
                    }))}
                </div>     
            </div>
           
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        photos: state.photo,
        album: state.album
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAlbumInfo: ((albumId) => {
            dispatch(fetchAlbumById(albumId))
        }),
        getAlbumPhotos: ((albumId) => {
            dispatch(getPhotosByAlbum(albumId))
        }),
        getPhotos: (() => {
            dispatch(getAllPhotos())
        }),
        deleteAlbumById: ((albumId) => {
            dispatch(deleteAlbum(albumId))
        }),
        // fetchUser: ((userId) => {
        //     dispatch(fetchSingleUser(userId))
        // }),
        // fetchUserAlbums: ((userId) => {
        //     dispatch(fetchUserAlbums(userId))
        // })
        
    }
}

const connectedAlbumViewer = connect(mapStateToProps, mapDispatchToProps)

export default connectedAlbumViewer(AlbumViewer)