import React, {Component} from 'react';
import {connect} from 'react-redux';
import {me} from '../store/user';
import history from '../history';
import "../../public/style.css"
import {createNewAlbum, fetchAlbumByName, deleteAlbum, fetchUserAlbums} from '../store/album';

class UploadAlbumPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            albumName: "",
            description: "",
            owner: this.props.user.id,
            uploadPhoto: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.makeAlbum = this.makeAlbum.bind(this);
        this.onUpload = this.onUpload.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }
    componentDidMount() {
        this.props.currUser();
    }

    handleChange(evt) {
        this.setState({
          [evt.target.name]: evt.target.value
        })
    }

    handleBack(evt) {
        evt.preventDefault();
        this.props.delete(this.props.album.albumId);
        history.push('/home')
    }

    async makeAlbum(evt) {
        evt.preventDefault();
        await this.props.getAlbumByName(this.state.albumName);
        if(!this.props.album[0]) {
            this.props.newAlbum({
                albumName: this.state.albumName,
                description: this.state.description,
                owner: this.state.owner
            })
            alert('Album name valid!!');
            this.setState({
                uploadPhoto: true
            })
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
            <div id="albumupload">
                <h3>Give your album a title and description!</h3>
                <div>
                    <form>
                        <div>
                            <input id="uploadbar"  className="InputBar" name="albumName" type="text" value={this.state.albumName} placeholder="Title" onChange={this.handleChange}/>
                        </div>
                        <div>
                            <input id="uploadbar" className="InputBar" name="description" type="text" value={this.state.description} placeholder="Description" onChange={this.handleChange}/>
                            <div>
                                <button className="defaultbutton" onClick={this.makeAlbum}>Check Availability</button>
                            </div>
                        </div>
                    </form>
                </div>
                {(this.state.uploadPhoto)?(<div><h3>Choose your images!</h3>
                <div>
                    <form id="photoUplaod" action="/api/photo/" method="post" encType="multipart/form-data">
                        <input className="defaultbutton" id="navbutton" type="file" name="photo" multiple onChange={this.onUpload}></input>
                        <input className="defaultbutton" id="navbutton" type="submit" value="Upload Image" name="submit"></input>
                    </form >
                </div></div>):(null)}
                <div>
                    <button onClick={this.handleBack}>Back</button>
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
        updateUserAlbums: (userId) => {
            dispatch(fetchUserAlbums(userId))
        },
        newAlbum: (albumInfo) => {
            dispatch(createNewAlbum(albumInfo));
        },
        getAlbumByName: (albumName) => {
            dispatch(fetchAlbumByName(albumName))
        },
        delete: (albumId) => {
            dispatch(deleteAlbum(albumId))
        },

        // fetchAlbums: (userId => {
        //     dispatch(fetchUserAlbums(userId))
        // })
       
    }
}

const connectedUploadAlbumPage = connect(mapStateToProps, mapDispatchToProps);

export default connectedUploadAlbumPage(UploadAlbumPage);
