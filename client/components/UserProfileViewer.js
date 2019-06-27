import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Route, Switch} from 'react-router-dom'

import {fetchTargetUser} from '../store/targetuser';
import {fetchUserAlbums} from '../store/album'
import {UserCard, AlbumContainer} from './';
import {Link} from 'react-router-dom'
import "../../public/style.css"
import { SearchAlbum } from './'


class UserProfileViewer extends Component {
  async componentDidMount() {
    await this.props.fetchUser(this.props.match.params.id);
    await this.props.fetchUserAlbums(this.props.match.params.id);
   
  }

  render() {
    const arr = Object.values(this.props.album)
  
    return (  

      <div id="targetprofilepage">
       <Route path="" component={SearchAlbum} />
        <h2 id="profilename">You are now viewing {this.props.targetuser.firstName} {this.props.targetuser.lastName}'s page</h2>

        <div id="usercard">
          <UserCard user={this.props.targetuser} />
        </div>

        <div id="useralbum">
            <AlbumContainer albums={arr} />
            </div>
      </div>
    )  
  }
}

/**
 * CONTAINER
 */

const mapState = state => {
  return {
    targetuser: state.targetuser,
    userAlbums: state.album,
    album: state.album
  }
}

const mapDispatch = dispatch => {
  return {
    fetchUser: userId => {
      dispatch(fetchTargetUser(userId));
    }    ,
    fetchUserAlbums: userId => {
      dispatch(fetchUserAlbums(userId))
    }
  }
}

export default  connect(mapState,mapDispatch)(UserProfileViewer);
