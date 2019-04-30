import React, {Component} from 'react'

// const PhotoCard = (props) => {
//     return(
//         <div>Photo</div>
//     )
// }

export default class PhotoCard extends Component {
    render() {
        const photo = this.props.photo
        return(
            <div>
                <img src={photo.photoPath} height="400" width="250"/>
            </div>
        )
    }
}