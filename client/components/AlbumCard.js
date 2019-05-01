import React, {Component} from 'react'
import {connect} from 'react-redux'
import history from '../history'
import {deleteAlbum} from '../store/album'
import {fetchSingleUser} from '../store/user'

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
            <li><h5 id="albumowner">Album owner : {album.owner}</h5></li>
            <li><<h3 id="albumname">Album description :{album.description}</h3></li>


          </ul>    
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return { 
    deleteAlbumById: (albumId) => {
      dispatch(deleteAlbum(albumId))
    },
    getAlbumOwner: (ownerId) => {
      dispatch(fetchSingleUser(ownerId))
    }
  }
}

const connectedAlbumCard = connect(mapStateToProps, mapDispatchToProps);


export default connectedAlbumCard(AlbumCard)