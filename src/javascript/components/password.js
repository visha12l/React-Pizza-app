import React from 'react';

export default class Password extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      type: 'password',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.togglePassword = this.togglePassword.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  togglePassword(e) {
    e.preventDefault();
    if (this.state.value) {
      if (this.state.type === 'password') {
        this.setState({
          type: 'normal',
        });
      } else {
        this.setState({
          type: 'password',
        });
      }
    } else {
      // alert('password is empty');
    }
  }

  render() {
    const { type, value } = this.state;
    return (
      <form className="loginForm text-center">
        <input
          className="userInput"
          value={value}
          onChange={this.handleInputChange}
          type={type}
        />
        <button
          className="btn btn-info"
          onClick={this.togglePassword}
          type="submit"
        >{`${type === 'password' ? 'show' : 'hide'} password`}
        </button>
      </form>
    );
  }
}
