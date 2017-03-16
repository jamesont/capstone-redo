import axios from "axios"
import React from "react"

import {Button} from "react-materialize"
import {Component} from "react"
import {Input} from 'react-materialize'
import {Row} from 'react-materialize'

class LoginForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  onSubmit(e){
    e.preventDefault()
    this.props.loginTrue()
    console.log(this.state)
    axios.post('/LoginForm', {
      email: this.state.email,
      hashed_password: this.state.password
    }).then(function (res) {
      console.log(res)
    }).catch(function (err) {
      console.log(err)
    })
  }

  render(){
    return (
      <div className="container">
        <form action="POST"
          className="form-inline"
          onSubmit={this.onSubmit.bind(this)}
          >
          <Row s={6}>
            <Input
              className="form-control"
              type="password"
              label="password" s={12}
              onChange={event => this.setState({ password: event.target.value })}
            />
          </Row>
            <Input
              className="form-control"
              type="email"
              label="Email"
              s={12}
              onChange={event => this.setState({ email: event.target.value })}
            />
          <Row s={6}>
            <Button
              type="submit"
              waves='light'>
              Log In
            </Button>
          </Row>
        </form>
      </div>
    )
  }
}

export default LoginForm
