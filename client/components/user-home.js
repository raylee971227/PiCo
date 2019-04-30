import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import history from '../history'
import {fetchsingleAlbum} from '../store/album';
import {AlbumCard} from './';


/**
 * COMPONENT
 */

class UserHome extends Component {
  componentDidMount() {
    
  }

  render() {
    return (
      <div>
{/*         <AlbumCard album = {this.props.album}/>
 */}      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
/*     album:state.album
 */  }
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
