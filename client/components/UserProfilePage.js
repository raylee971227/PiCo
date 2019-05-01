import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Route, Switch} from 'react-router-dom'

import {fetchSingleUser} from '../store/user';
import {fetchUserAlbums} from '../store/album'
import {UserCard, AlbumContainer} from './';
import {Link} from 'react-router-dom'
import "../../public/style.css"
import { SearchAlbum } from './'



class UserProfilePage extends Component {
  async componentWillMount() {
    await this.props.fetchUser(this.props.match.params.id);
    await this.props.fetchUserAlbums(this.props.match.params.id);
  }

  render() {
    const arr = Object.values(this.props.album)
    return (  
      <div id="profilepage">
            <Route path="" component={SearchAlbum} />
            <div id="usercard">
               <UserCard user={this.props.user} />
               <Link to="/updateuser">Edit Info</Link>
            </div>

            <div id="useralbum">
            <h3>{this.props.user.firstName}'s Albums</h3>
            <AlbumContainer albums={arr} />
            </div>
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
    userAlbums: state.album,
    album: state.album
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
