import React from 'react'

const AlbumCard = props => {
  const {album} = props;
  return(
    <div>
      
      <a>Name of the Album !{album.name} </a> !
    
      
    </div>
  )
}

export default AlbumCard