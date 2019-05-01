import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deletePhotoById} from '../store/photo'


class PhotoCard extends Component {
    constructor() {
        super()
        this.handleDelete = this.handleDelete.bind(this)
    }
    componentDidMount() {

    }

    handleDelete() {
        this.props.deletePhoto(this.props.photo.photoId)
        window.location.reload();
    }

    render() {
        const photo = this.props.photo;
        
        return(
            <div>
                <div>
                    <img src={photo.photoPath} height="400" width="250"/>
                </div>
               {(photo.owner == this.props.curUser.id)?(                <div>
                    <button onClick={this.handleDelete}>Delete Photo</button>
                </div>):(null)}
            </div>
        )
    }
}



const mapDispatchToProps = dispatch => {
    return {
        deletePhoto: photoId => {
            dispatch(deletePhotoById(photoId))
        }
    }
}

const connectedPhotoCard = connect(null, mapDispatchToProps)

export default connectedPhotoCard(PhotoCard)