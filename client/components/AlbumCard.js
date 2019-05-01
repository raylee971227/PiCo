import React, {Component} from 'react'
import history from '../history'
// const AlbumCard = props => {
//   const {album} = props;
//   return(
//     <div>
//       <img src={album.thumbnail} />
//       <h5>{album.albumName}</h5>    
//     </div>
//   )
// }
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

          </ul>    
        </div>
       
      </div>
    )
  }
}

export default AlbumCard