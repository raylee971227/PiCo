import React, {Component} from 'react';
import {connect} from 'react-redux';
import {me} from '../store/user';
import history from '../history';
import "../../public/style.css"

class UploadAlbumPage extends Component {
    
    render() {
        return(
            <div>
                <h3> Upload your Albums here!</h3>
                <div>
                    <form action="/multer/upload" method="post" encType="multipart/form-data">
                        <input className="defaultbutton" id="navbutton" type="file" name="file"></input>
                        <input className="defaultbutton" id="navbutton" type="submit" value="Upload Image" name="submit"></input>
                    </form>
                    
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
        currUser: () => {
            dispatch(me());
        }
    }
}

const connectedUploadAlbumPage = connect(mapStateToProps, mapDispatchToProps);

export default connectedUploadAlbumPage(UploadAlbumPage);