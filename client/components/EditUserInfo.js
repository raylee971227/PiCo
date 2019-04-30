import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser, me } from '../store/user';
import history from '../history';


class EditUserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: this.props.user.userName,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      // accountSetUp: this.props.user.accountSetUp,
      /* Will have to fix this later */
      accountSetUp: true
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onUpload = this.onUpload.bind(this);
  }

  componentDidMount() {
    this.props.currUser();
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    this.props.update(this.state, this.props.user.id);
    history.push('/home')
  }
  onUpload(evt) {
    evt.preventDefault()
    console.log('upload nigga')
    document.getElementById("profilePhotoUpload").action = "/api/users/" + this.props.user.id 
    console.log(document.getElementById('profilePhotoUpload').action)
  } 

  render() {
    return (
      <React.Fragment>
        {(this.props.user.accountSetUp) ? (<h3>Edit Your Information</h3>) : (<h3>Please fill out the required forms (*)</h3>)}
        <form onSubmit={this.handleSubmit}>
          <div>
            <div>
              <p>Profile Picture</p>
              <img src={this.props.user.profilePicture} />
              <form id="profilePhotoUpload" action="/" method="post" encType="multipart/form-data">
                <input type="file" name="photo" onChange={this.onUpload}></input>
                <input type="submit" value="Upload Image" name="submit"></input>
              </form>
              <p>User Name*</p>
              <input onChange={this.handleChange} type="text" name="userName" value={this.state.userName} />
              <p>First Name*</p>
              <input onChange={this.handleChange} type="text" name="firstName" value={this.state.firstName} />
              <p>Last Name*</p>
              <input onChange={this.handleChange} type="text" name="lastName" value={this.state.lastName} />
              <p>Email</p>
              <input onChange={this.handleChange} type="text" name="email" value={this.state.email} />
            </div>
            <button type="submit">Make Change</button>
          </div>
        </form>
      </React.Fragment>
    )
  }

}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    update: (updateInfo, userId) => {
      dispatch(updateUser(updateInfo, userId));
    },
    currUser: () => {
      dispatch(me());
    }
  }
}

const connectedEditUserInfo = connect(mapStateToProps, mapDispatchToProps)

export default connectedEditUserInfo(EditUserInfo)