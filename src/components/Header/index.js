import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'

import Cookies from 'js-cookie'
import {Logoimg} from '../login/style'
import './index.css'
import {Headerline, Loginbtn, Para} from './style'

class Header extends Component {
  state = {hcliked: true, cliked: false}

  logout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  change = () => this.setState({hcliked: false, cliked: true})

  changehome = () => this.setState({hcliked: true, cliked: false})

  render() {
    const {hcliked, cliked} = this.state

    return (
      <Headerline>
        <Link to="/">
          <Logoimg
            src="https://res.cloudinary.com/dbs9akgm5/image/upload/v1678253576/logo_zyhxy9.png"
            alt="website logo"
          />
        </Link>
        <div className="headlines">
          <li>
            <Link to="/" className="link">
              <Para onClick={this.changehome} cliked={hcliked}>
                Home
              </Para>
            </Link>
          </li>
          <li>
            <Link to="/shelf" className="link">
              <Para onClick={this.change} cliked={cliked}>
                Bookshelves
              </Para>
            </Link>
          </li>
          <Loginbtn type="button" onClick={this.logout}>
            Logout
          </Loginbtn>
        </div>
      </Headerline>
    )
  }
}
export default withRouter(Header)
