import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchSingleUser} from '../store/user';
import {fetchUserAlbums} from '../store/album'
import {UserCard, AlbumContainer} from './';
import {Link} from 'react-router-dom'



class UserProfilePage extends Component {
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id);
    this.props.fetchUserAlbums(this.props.match.params.id);
  }

  render() {
    return (  
      <div>
            
            Welcome To Your Page
            <UserCard user={this.props.user} />
            <Link to="/updateuser">Edit Info</Link>
            <h3>{this.props.user.userName}'s Albums</h3>
            <AlbumContainer albums={this.props.albums} />
      </div>
    )  
  }
}

/**
 * CONTAINER
 */

const mapStateToProps = state => {
  return {
    user: state.user,
    userAlbums: state.album
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: userId => {
      dispatch(fetchSingleUser(userId));
    },
    fetchUserAlbums: userId => {
      dispatch(fetchUserAlbums(userId))
    }
  }
}


const connectedUserProfilePage = connect(mapStateToProps, mapDispatchToProps);

export default connectedUserProfilePage(UserProfilePage);
