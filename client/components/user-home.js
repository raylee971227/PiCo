import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import history from '../history'
/**
 * COMPONENT
 */

class UserHome extends Component {
  componentDidMount() {
    if(!this.props.user.accountSetUp) {
      history.push('/updateuser');
    }
  }

  render() {
    return (
      <div>
<img src="https://i.kym-cdn.com/entries/icons/original/000/029/223/cover2.jpg" alt="Smiley face" width="50%" height="50%"></img>      </div>
    )
  }
}

// export const UserHome = props => {


//   const {email} = props
//   return (
//     <div>
//       <h3>Welcome, {email}</h3>
//     </div>
//   )
// }

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
