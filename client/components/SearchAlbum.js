import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import {fetchUserFromID} from '../store/targetuser';

import history from '../history'
import "../../public/style.css"

class Navbar extends Component {
  constructor() {
    super()
    this.handleProfile = this.handleProfile.bind(this)
    this.handlePiCo = this.handlePiCo.bind(this)
    this.handleASearch = this.handleASearch.bind(this)
  }

  handlePiCo() {
    history.push('/home');
  }

  handleProfile() {
    history.push(`/users/${this.props.user.id}`);
  }

  handleASearch(event) {
    event.preventDefault();
    var searched =  document.getElementById('InputBar').value
    return this.Search(searched);
  }

  Search(param1) {
    // this.props.fetchUser(param1);
  
  }

  render() {
    return (
      <div id="SearchAlbum">
          <h2>Search an album !</h2>
          <form className="Search"  onSubmit={this.handleASearch}>
                  <input 
                    className="InputBar"
                    type="text"
                    placeholder="Search an album"
                    />
                <button className="defaultbutton" id="searchbutton" type="submit">  Search !</button>
            </form>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    targetuser:state.targetuser,
    error: state.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    fetchUser: username => {
      dispatch(fetchUserFromID(username));
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
