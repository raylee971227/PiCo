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
      <div>
        <img src={album.thumbnail} onClick={this.onClick}/>
        <h5>{album.albumName}</h5>    
      </div>
    )
  }
}

export default AlbumCard