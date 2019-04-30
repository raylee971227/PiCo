import React, {Component} from 'react';
import {connect} from 'react-redux';
import {me} from '../store/user';
import history from '../history';
import "../../public/style.css"
import {createNewAlbum, fetchAlbumByName} from '../store/album';

class UploadAlbumPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            albumName: "",
            description: "",
            owner: this.props.user.id,
        }

        this.handleChange = this.handleChange.bind(this);
        this.makeAlbum = this.makeAlbum.bind(this);
        this.onUpload = this.onUpload.bind(this);
    }
    componentDidMount() {
        this.props.currUser();
    }

    handleChange(evt) {
        this.setState({
          [evt.target.name]: evt.target.value
        })
      }

    makeAlbum(evt) {
        evt.preventDefault();
        this.props.getAlbumByName(this.state.albumName);
        if(this.props.album.length === 0) {
            this.props.newAlbum({
                albumName: this.state.albumName,
                description: this.state.description,
                owner: this.state.owner
            })
            alert('Album name valid!!');
        }
        else {
            alert('Album with the same name exists! Please use another name');
        }
    }

    onUpload(evt) {
        evt.preventDefault();
        document.getElementById("photoUplaod").action = "/api/photo/" + this.props.album.albumId + "/" + this.props.user.id
    }

    render() {
        return(
            <div>
                <h3>Give your album a title and description!</h3>
                <div>
                    <form>
                        <div>
                            <small>Title:</small>
                            <input name="albumName" type="text" value={this.state.albumName} onChange={this.handleChange}/>
                        </div>
                        <div>
                            <small>Description:</small>
                            <input name="description" type="text" value={this.state.description} onChange={this.handleChange}/>
                            <div>
                                <button onClick={this.makeAlbum}>Check Availability</button>
                            </div>
                        </div>
                    </form>
                </div>
                <h3>Choose your images!</h3>
                <div>
                    <form id="photoUplaod" action="/api/photo/" method="post" encType="multipart/form-data">
                        <input className="defaultbutton" id="navbutton" type="file" name="photo" multiple onChange={this.onUpload}></input>
                        <input className="defaultbutton" id="navbutton" type="submit" value="Upload Image" name="submit"></input>
                    </form >
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        album: state.album
    }
}

const mapDispatchToProps = dispatch => {
    return {
        currUser: () => {
            dispatch(me());
        },
        newAlbum: (albumInfo) => {
            dispatch(createNewAlbum(albumInfo));
        },
        getAlbumByName: (albumName) => {
            dispatch(fetchAlbumByName(albumName))
        }
    }
}

const connectedUploadAlbumPage = connect(mapStateToProps, mapDispatchToProps);

export default connectedUploadAlbumPage(UploadAlbumPage);
