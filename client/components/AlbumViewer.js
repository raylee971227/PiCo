import React, {Component} from 'react';
import {connect} from 'react-redux';
import history from '../history'
import PhotoCard from './PhotoCard'
import {getPhotosByAlbum, getAllPhotos} from '../store/photo';


class AlbumViewer extends Component {
    async componentDidMount() {
        await this.props.getAlbumPhotos(this.props.match.params.id)
    }
    
    render() {
        const arr = Object.values(this.props.photos)
        console.log(arr)
        return(
            <div>
                {(arr.map((photo) => {
                    return (<PhotoCard photo={photo}/>)
                }))}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        photos: state.photo,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAlbumPhotos: ((albumId) => {
            dispatch(getPhotosByAlbum(albumId))
        }),
        getPhotos: (() => {
            dispatch(getAllPhotos())
        })
    }
}

const connectedAlbumViewer = connect(mapStateToProps, mapDispatchToProps)

export default connectedAlbumViewer(AlbumViewer)