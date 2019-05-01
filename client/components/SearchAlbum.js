import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import {fetchAlbumByName} from '../store/album';

import history from '../history'
import "../../public/style.css"

class Navbar extends Component {
  constructor() {
    super()
    this.handleProfile = this.handleProfile.bind(this)
    this.handlePiCo = this.handlePiCo.bind(this)
    this.handlefilter = this.handlefilter.bind(this)
  }

  handlePiCo() {
    history.push('/home');
  }

  handleProfile() {
    history.push(`/users/${this.props.user.id}`);
  }

  handlefilter(event) {
    event.preventDefault();
    var searched =  document.getElementById('albumbar').value;
    return this.filter(searched);
  }

  filter(param1) {
     this.props.filteralbum(param1);
  
  }

  render() {
    return (
      <div id="SearchAlbum">
          <h2>Search an album !</h2>
          <form className="Search"  onSubmit={this.handlefilter}>
                  <input 
                    id="albumbar"
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
    filteralbum: albumname => {
      dispatch(fetchAlbumByName(albumname));
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
