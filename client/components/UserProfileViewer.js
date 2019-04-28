import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {fetchSingleUser} from '../store/user';
import {UserCard} from './';


class UserProfileViewer extends Component {
 

  render() {
    return (  
      <div>
        Welcome To Someone Else's Page
        <p>ppepeppepapape{this.props.targetuser.userName}</p>
      </div>
    )  
  }
}

/**
 * CONTAINER
 */

const mapStateToProps = state => {
  return {
    targetuser: state.targetuser
  }
}

export default  connect(mapStateToProps)(UserProfileViewer);
