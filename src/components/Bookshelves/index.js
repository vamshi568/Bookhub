import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaSearch} from 'react-icons/fa'
import Header from '../Header'

import Searchbooks from '../Searchbooks'
import Support from '../Support'
import Falureview from '../Falureview'
import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

class Bookshelves extends Component {
  state = {
    shelf: 'ALL',
    serachinput: '',
    heading: 'All',
    reslist: [],
    status: 'loading',
  }

  componentDidMount() {
    this.renderlistelements()
  }

  componentDidUpdate(prevProps, prevState) {
    const {shelf, serachinput} = this.state
    if (prevState.shelf !== shelf || prevState.serachinput !== serachinput) {
      this.renderlistelements()
    }
  }

  succseslist = () => {
    const {reslist, serachinput} = this.state

    return (
      <>
        {reslist.length <= 0 ? (
          <div className="errorimg">
            <img
              src="https://res.cloudinary.com/dbs9akgm5/image/upload/v1678348782/nofiles_w80qrl.png"
              alt="no files found"
            />
            <p>Your search for {serachinput} did not find any matches.</p>
          </div>
        ) : (
          reslist.map(each => <Searchbooks list={each} key={each.id} />)
        )}
        <Support />
      </>
    )
  }

  errorres = () => <Falureview onclick={this.renderlistelements} />

  renderlistelements = async () => {
    const {shelf, serachinput} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const responce = await fetch(
      `https://apis.ccbp.in/book-hub/books?shelf=${shelf}&search=${serachinput}`,
      options,
    )
    const data = await responce.json()
    if (responce.ok === true) {
      const res = data.books.map(each => ({
        id: each.id,
        title: each.title,
        readStatus: each.read_status,
        rating: each.rating,
        authorName: each.author_name,
        coverPic: each.cover_pic,
      }))
      //   console.log(res[0])
      this.setState({reslist: res, status: 'success'})
    } else {
      this.setState({status: 'error'})
    }
  }

  renderlist = data => {
    this.setState({shelf: data.value, heading: data.label})
  }

  searchresults = event => this.setState({serachinput: event.target.value})

  renderbookshelve = () => (
    <div className="buttons">
      <h1>Bookshelve</h1>
      <button type="button" onClick={() => this.renderlist(bookshelvesList[0])}>
        All
      </button>
      <button type="button" onClick={() => this.renderlist(bookshelvesList[1])}>
        Read
      </button>
      <button type="button" onClick={() => this.renderlist(bookshelvesList[2])}>
        Currently Reading
      </button>
      <button type="button" onClick={() => this.renderlist(bookshelvesList[3])}>
        Wants to read
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderbla = () => {
    const {status} = this.state
    switch (status) {
      case 'loading':
        return this.renderLoadingView()
      case 'success':
        return this.succseslist()
      case 'error':
        return this.errorres()

      default:
        break
    }
    return null
  }

  render() {
    const {serachinput, heading} = this.state

    return (
      <>
        <Header />
        <div className="shelfs">
          {this.renderbookshelve()}
          <div className="goku">
            <div className="search">
              <label htmlFor="search">{heading} Books</label>
              <input
                id="search"
                type="search"
                onChange={this.searchresults}
                value={serachinput}
              />
              <button type="button" onClick={this.renderlistelements}>
                <FaSearch />
              </button>
            </div>
            <div className="books">{this.renderbla()}</div>
          </div>
        </div>
      </>
    )
  }
}

export default Bookshelves
