import React, {Component} from 'react'
import {connect} from 'react-redux'
import history from '../history'
import {deleteAlbum} from '../store/album'

class AlbumCard extends Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)

  }
  onClick() {
    history.push(`/album/${this.props.album.albumId}`);
  }
  render(){
    const {album} = this.props;

    return(
      <div id="albumcard">
        
        <img src={album.thumbnail} onClick={this.onClick}/>

        <div id="albumdetails">
          <ul>
            <li><h5 id="albumname">Album Name : {album.albumName}</h5></li>
            <li><h5 id="albumname">Album Description : {album.description}</h5></li>

          </ul>    
        </div>
       

      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return { 
    deleteAlbumById: (albumId) => {
      dispatch(deleteAlbum(albumId))
    }
  }
}

const connectedAlbumCard = connect(null, mapDispatchToProps);


export default connectedAlbumCard(AlbumCard)