import React, {Component} from 'react'
import {AlbumCard} from './'
export default class AlbumContainer extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        const userAlbums = this.props.albums
        return (
            <div>
                {(userAlbums.length == 0)?(<div>No albums to show :^(</div>):(userAlbums.map((album) => {
                   return(<AlbumCard album={album}/>)
                }))}
            </div>
        )
    }
}

