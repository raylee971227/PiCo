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
        {(album != null)?(
        <React.Fragment><img src={album.thumbnail} onClick={this.onClick}/><div id="albumdetails">
        <ul>
          <li><h2 id="albumname">{album.albumName}</h2></li>
          <h3 id="albumname">{album.description}</h3>
        </ul>    
        </div></React.Fragment>):(null)}
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