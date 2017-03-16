import React, {Component} from "react"
import {Row} from 'react-materialize'
import {Input} from 'react-materialize'
import axios from "axios"
import {Button} from "react-materialize";

class SignUpForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
  }


  onSubmit(e){
    e.preventDefault()
    this.props.loginTrue()
    axios.post('http://localhost:8000/createNewUser', {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      hashed_password: this.state.password
    }).then(function (response) {
      console.log(response)
    }).catch(function (error) {
      console.log(error);
    });
  }

  render(){
    return (
      <div className="container">
        <form action="POST"
          className="form-inline"
          onSubmit={this.onSubmit.bind(this)}
          >
          <Row s={12}>
            <Input
              type="text"
              className="form-control"
              s={6}
              label="First Name"
              onChange={event => this.setState({ firstName: event.target.value })}
            />
            <Input
              type="text"
              className="form-control"
              s={6}
              label="Last Name"
              onChange={event => this.setState({ lastName: event.target.value })}
            />
            <Input
              className="form-control"
              type="email"
              label="Email"
              s={12}
              onChange={event => this.setState({ email: event.target.value })}
            />
            <Input
              className="form-control"
              type="password"
              label="password" s={12}
              onChange={event => this.setState({ password: event.target.value })}
            />
          </Row>
          <Button
            type="submit"
            waves='light'>Log In
          </Button>
        </form>
      </div>
    )
  }

}

export default SignUpForm
