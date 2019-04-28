import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {fetchTargetUser} from '../store/targetuser';
import {UserCard_other} from './';


class UserProfileViewer extends Component {
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id);
  }

  render() {
    return (  
      <div>
        Welcome To Someone Else's Page
        <UserCard_other user={this.props.targetuser} />

      </div>
    )  
  }
}

/**
 * CONTAINER
 */

const mapState = state => {
  return {
    targetuser: state.targetuser
  }
}

const mapDispatch = dispatch => {
  return {
    fetchUser: userId => {
      dispatch(fetchTargetUser(userId));
    }    
  }
}

export default  connect(mapState,mapDispatch)(UserProfileViewer);
