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
    this.handleSearch = this.handleSearch.bind(this)
  }

  handlePiCo() {
    history.push('/home');
  }

  handleProfile() {
    history.push(`/users/${this.props.user.id}`);
  }

  handleSearch(event) {
    var searched =  document.getElementById('SearchBar').value


    event.preventDefault();
    return this.Search(searched);
  }

  Search(param1) {
    this.props.fetchUser(param1);
  
  }

  render() {
    return (
      <div>
        <h1 href="/#" onClick={this.handlePiCo}>PiCo</h1>
        <nav id="Navbar">
          {this.props.isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <a onClick={this.handleProfile}> My Profile </a>
              <a onClick={this.props.handleClick}> Logout </a>
              <Link to="/upload"> Upload Album </Link>
            <form id="Search" onSubmit={this.handleSearch}>
                  <input 
                    id="SearchBar"
                    type="text"
                    placeholder="Type Something !"
                    />
                <button id="SearchButton" type="submit"> Search </button>
            </form>
            </div>
          ) : (
              <div>
                {/* The navbar will show these links before you log in */}
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </div>
            )}
        </nav>
        <hr />
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
