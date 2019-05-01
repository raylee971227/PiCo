import React, {Component} from 'react'
import {AlbumCard} from './'
export default class AlbumContainer extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        const userAlbums = this.props.albums
        return (
            <div >
                {userAlbums.map((album) => {    
                   return(<div><AlbumCard album={album}/></div>)
                })}
            </div>
        )
    }
}

