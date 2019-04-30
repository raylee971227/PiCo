import React from 'react'

const AlbumCard = props => {
  const {album} = props;
  return(
    <div>
      <img src={album.thumbnail} />
      <h5>{album.albumName}</h5>    
    </div>
  )
}

export default AlbumCard