import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import history from '../history'
/**
 * COMPONENT
 */
import {fetchUserAlbums} from '../store/album'
import {UserCard, AlbumContainer} from './';

class UserHome extends Component {
  componentDidMount() {
    if(!this.props.user.accountSetUp) {
      history.push('/updateuser');
    }
  }

  render() {
    const arr = Object.values(this.props.album)

    return (
      <div id="homepage">
 
        <h3>Welcome, {this.props.email}</h3>

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
/*     album:state.album
 */  
    email: state.user.email,
    user: state.user,
    userAlbums: state.album,
    album: state.album
  }
}
const mapDispatch = dispatch => {
  return {
    fetchalbum: userId => {

      dispatch(fetchUserAlbums(userId))
    }
  }
}
export default connect(mapState,mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}