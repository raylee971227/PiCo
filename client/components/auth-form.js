import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import "../../public/style.css"
/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
        <div>
          <div className="description">
              <img id="descimg" src="https://i.imgur.com/FfqPmEu.png"></img>
              <hr></hr>
              <p>
              PICO

              Minyoung Na / Ray Lee / Mrigank Saksena / Iris Huang  <br/>
              Boilermaker <br/>
              Good things come in pairs <br/>
              Looking to mix up a backend with express/sequelize and a frontend with react/redux? That's boilermaker! <br/>
              Follow along with the workshop to make your own! This canonical version can serve as a reference, or a starting point all on its own. <br/>
              </p>
              <p>
              Setup
              To use this boilerplate, you'll need to take the following steps:
             
              Don't fork or clone this repo! Instead, create a new, empty directory on your machine and git init (or create an empty repo on Github and clone it to your local machine) <br/>  <br/>
              Run the following commands:  <br/>
              git remote add boilermaker https://github.com/FullstackAcademy/boilermaker.git  <br/>
              git fetch boilermaker  <br/> 
              git merge boilermaker/master  <br/> <br/>
              Why did we do that? Because every once in a while, boilermaker may be updated with additional features or bug fixes, and you can easily get those changes from now on by entering:
             
              git fetch boilermaker
              git merge boilermaker/master
              </p>
          </div>
          <div className="authform">
            <form  onSubmit={handleSubmit} name={name}>
              <div>
              
                <input  className="InputBar" className="AuthBar"  name="email" type="text" placeholder="Email" />
              </div>
              <div>
            
                <input  className="InputBar" className="AuthBar" name="password" type="password" placeholder="Password" />
              </div>
              <div>
                <button   id="AuthButton" className="defaultbutton"  type="submit">{displayName}</button>
              </div>
              {error && error.response && <div> {error.response.data} </div>}
            </form>
            <hr></hr>
            <a href="/auth/google">{displayName} with Google</a>
          </div>
       </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
