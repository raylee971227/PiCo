import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchSingleUser} from '../store/user';
import {UserCard} from './';
import {Link} from 'react-router-dom'
import "../../public/style.css"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 



class UserProfilePage extends Component {
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id);
  }

  render() {
    return (  
      
            <div>
  
                      Welcome To Your Page
    
                       <UserCard user={this.props.user} />

                      <Link  className="defaultbutton" id="navbutton" to="/updateuser">Edit Info</Link>
                  
            </div>
      
    )  
  }
}

/**
 * CONTAINER
 */

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
