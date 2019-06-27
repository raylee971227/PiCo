import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import history from '../history'
/**
 * COMPONENT
 */
import {fetchAllAlbums} from '../store/album'
import {AlbumContainer} from './';

class UserHome extends Component {
  componentDidMount() {
    this.props.allAlbums()
    if(!this.props.user.accountSetUp) {
      history.push('/updateuser');
    }
  }

  render() {
    const arr = Object.values(this.props.album)
    return (
      <div id="homepage">
        <div id="useralbum">

            <h2>Dashboard</h2>
            <AlbumContainer albums={arr}/>

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
    
    allAlbums: () => {
      dispatch(fetchAllAlbums())
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