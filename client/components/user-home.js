import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import history from '../history'
/**
 * COMPONENT
 */

class UserHome extends Component {
  componentDidMount() {
    if(!this.props.user.accountSetUp) {
      history.push('/updateuser');
    }
  }

  render() {
    return (
      <div>
{/*         <AlbumCard album = {this.props.album}/>

 */}      
        <h3>Welcome, {this.props.email}</h3>
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
    user: state.user
  }
}
const mapDispatch = dispatch => {
  return {
    fetchalbum: userId => {
/*       dispatch(fetchsingleAlbum(userId));
 */    }
  }
}
export default connect(mapState,mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}