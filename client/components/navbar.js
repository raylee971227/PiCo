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
    console.log("debug");

    event.preventDefault();
    return this.Search(searched);
  }

  Search(param1) {
    this.props.fetchUser(param1);
  
  }

  render() {
    return (
      <div id="Header">
        <nav id="Navbar">
          <h1 className="defaultbutton" id ="Logo" href="/#" onClick={this.handlePiCo}>PiCo</h1>

          {this.props.isLoggedIn ? (
            <div className="navrack">
              {/* The navbar will show these links after you log in */}
              <Link className="defaultbutton" id="navbutton" to="/home">Home</Link>
              <a className="defaultbutton" id="navbutton" onClick={this.handleProfile}>My Profile</a>
              <a className="defaultbutton" id="navbutton" onClick={this.props.handleClick}>
                Logout
              </a>
              <Link className="defaultbutton" id="navbutton" to="/upload">Upload Album</Link>
            <form id="Search"  onSubmit={this.handleSearch}>
                  <input 
                    id="SearchBar"
                    type="text"
                    placeholder="Type Something !"
                    />
                <button className="defaultbutton" id="searchbutton" type="submit">  Search !</button>
            </form>
            <p>logged in as {this.props.user.userName}</p>
            </div>
          ) : (
              <div className="navrack">
                {/* The navbar will show these links before you log in */}
                <Link to="/login" className="defaultbutton" id="navbutton" className="defaultbutton">Login</Link>
                <Link to="/signup" className="defaultbutton" id="navbutton" className="defaultbutton">Sign Up</Link>
              </div>
            )}
        </nav>
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
