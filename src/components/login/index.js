import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import {Loginbtn, Input, Logoimg, Para, Errorpara} from './style'
import './index.css'

export default class Login extends Component {
  state = {username: '', password: '', errormgs: ''}

  usernameInput = e => this.setState({username: e.target.value})

  passwordInput = e => this.setState({password: e.target.value})

  fetchdata = async () => {
    const {username, password} = this.state

    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok === true) {
      const {history} = this.props
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      history.replace('/')
    } else if (response.ok === false) {
      this.setState({errormgs: data.error_msg})
    }
  }

  onclicklogin = e => {
    e.preventDefault()
    this.fetchdata()
  }

  renderlogincard = () => {
    const {username, password, errormgs} = this.state

    return (
      <>
        <form onSubmit={this.onclicklogin} className="card">
          <Logoimg
            src="https://res.cloudinary.com/dbs9akgm5/image/upload/v1678253576/logo_zyhxy9.png"
            alt="logo"
          />

          <Para htmlFor="username">Username*</Para>

          <Input
            placeholder="Enter your username"
            id="username"
            value={username}
            type="text"
            onChange={this.usernameInput}
          />

          <Para htmlFor="password">Password*</Para>

          <Input
            placeholder="Enter your password"
            id="password"
            value={password}
            type="password"
            onChange={this.passwordInput}
          />
          <Errorpara>{errormgs}</Errorpara>

          <Loginbtn type="submit">Login</Loginbtn>
        </form>
      </>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login">
        <div>
          <img
            className="image"
            src="https://res.cloudinary.com/dbs9akgm5/image/upload/v1678253578/login_qbpsru.png"
            alt="loginimg"
          />
        </div>
        <div className="logincard">{this.renderlogincard()}</div>
      </div>
    )
  }
}
