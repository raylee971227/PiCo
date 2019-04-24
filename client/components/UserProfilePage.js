import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchSingleUser} from '../store/user';
import {UserCard} from './';



class UserProfilePage extends Component {
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id);
  }

  render() {
    return (
      // <div>
      //   <h3>Welcome to your profile {this.props.user.firstName} {this.props.user.lastName}!!!</h3>
      //   <img src={this.props.user.profilePicture} width="100" height="100"></img>
      // </div>
      <div>
        <UserCard user={this.props.user} />
      </div>
    )  
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: userId => {
      dispatch(fetchSingleUser(userId));
    }
  }
}

const connectedUserProfilePage = connect(mapStateToProps, mapDispatchToProps);

export default connectedUserProfilePage(UserProfilePage);
