import React, {Component} from 'react';
import {connect} from 'react-redux';
import PhotoCard from './PhotoCard'
import {getPhotosByAlbum, getAllPhotos, deletePhotoByAlbum} from '../store/photo';
import {fetchAlbumById, deleteAlbum} from '../store/album';





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
            this.props.deleteAlbumPhotos(this.props.match.params.id)
            this.props.deleteAlbumById(this.props.match.params.id);
            window.location.replace('/users/' + this.props.user.id)
    }

    render() {

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
                        return (<PhotoCard photo={photo} owner={this.props.album.owner} curUser={this.props.user}/>)
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
        deleteAlbumPhotos: ((albumId) => {
            dispatch(deletePhotoByAlbum(albumId))
        })
    }
}

const connectedAlbumViewer = connect(mapStateToProps, mapDispatchToProps)

export default connectedAlbumViewer(AlbumViewer)