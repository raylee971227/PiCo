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
    this.Search = this.Search.bind(this);
  }

  handlePiCo() {
    history.push('/home');
  }

  handleProfile() {
    history.push(`/users/${this.props.user.id}`);
  }

  handleSearch(event) {
    var searched =  document.getElementById('SearchBar').value

    console.log(searched);
    event.preventDefault();
    //return this.Search(searched);
  }

  Search(param1) {

     //this.props.fetchUsername(param1);
  
  }

  render() {
    return (
      <div id="Header">
        <nav id="Navbar">
          <h1 className="defaultbutton" id ="Logo" href="/#" onClick={this.handlePiCo}>PiCo</h1>

          {this.props.isLoggedIn ? (
            <div className="navrack" id="loggedin">
              {/* The navbar will show these links after you log in */}
              <Link className="defaultbutton" id="navbutton" to="/home">Home</Link>
              <a className="defaultbutton" id="navbutton" onClick={this.handleProfile}>My Profile</a>
              <Link className="defaultbutton" id="navbutton" to="/upload">Upload</Link>

              <a className="defaultbutton" id="navbutton" onClick={this.props.handleClick}>
                Logout
              </a>
              
            <form className="Search"  onSubmit={this.handleSearch}>
                  <input 
                    className="InputBar"
                    type="text"
                    placeholder="Search a User !"
                    />
                <button className="defaultbutton" id="searchbutton" type="submit">  Search !</button>
            </form>
            </div>
          ) : (
              <div className="navrack" >
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
    user:state.user,
    targetuser:state.targetuser,
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    fetchUsername: username => {
      dispatch(fetchUserFromID(username));
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
