import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {fetchSingleUser} from '../store/user';
import {UserCard_other} from './';


class UserProfileViewer extends Component {
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id);
  }

  render() {
    return (  
      <div>
        Welcome To Someone Else's Page
        <UserCard_other user={this.props.user} />

      </div>
    )  
  }
}

/**
 * CONTAINER
 */

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchUser: userId => {
      dispatch(fetchSingleUser(userId));
    }    
  }
}

export default  connect(mapState,mapDispatch)(UserProfileViewer);
