import React, { Component } from 'react';


class ProfileCreator extends Component {

  constructor(props){
    super(props);

    this.createProfile = props.createProfile;
    this.profile = {};

    this.updateProp = this.updateProp.bind(this);
  }

  updateProp(propName){
    return (e) => {
      let val = e.target.value;
      this.profile[propName] = val;
    }
  }

  render() {
    return (
      <div>
        <h1>Create Your Profile</h1>
        <table>
          <tbody>
            <tr>
              <td>First Name:</td>
              <td><input type="text" onBlur={ this.updateProp('firstName') }></input></td>
            </tr>
            <tr>
              <td>Last Name:</td>
              <td><input type="text" onBlur={ this.updateProp('lastName') }></input></td>
            </tr>
            <tr>
              <td>City:</td>
              <td><input type="text" onBlur={ this.updateProp('city') }></input></td>
            </tr>
            <tr>
              <td>State</td>
              <td><input type="text" onBlur={ this.updateProp('state') } ></input></td>
            </tr>
            <tr>
              <td>Email</td>
              <td><input type="text" onBlur={ this.updateProp('email') }></input></td>
            </tr>
            <tr>
              <td>Password</td>
              <td><input type="text" onBlur={ this.updateProp('password') }></input></td>
            </tr>
          </tbody>
        </table>
        <button onClick={ () => {this.createProfile(this.profile)} }>Create My Free Profile!</button>
      </div>
    )
  }

}

export default ProfileCreator
