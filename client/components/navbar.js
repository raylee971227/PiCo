import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import history from '../history'

class Navbar extends Component {
  constructor() {
    super()
    this.handleProfile = this.handleProfile.bind(this)
    this.handlePiCo = this.handlePiCo.bind(this)
  }

  handlePiCo() {
    history.push('/home');
  }

  handleProfile() {
    history.push(`/users/${this.props.user.id}`);
  }

  render() {
    return (
      <div>
        <h1 href="/#" onClick={this.handlePiCo}>PiCo</h1>
        <nav>
          {this.props.isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <a onClick={this.handleProfile}>My Profile</a>
              {/* <Link to="/updateuser">Edit Info</Link> */}
              <a onClick={this.props.handleClick}>
                Logout
          </a>
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
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
