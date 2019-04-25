import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchSingleUser} from '../store/user';
import {UserCard} from './';



export default class UserProfileViewer extends Component {
 
  render() {
    return (  
      <div>
        {this.props.user}
      </div>
    )  
  }
}

/**
 * CONTAINER
 */
