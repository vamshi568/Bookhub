import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Topbook from '../Topbooks'

import './index.css'
import Support from '../Support'
import Falureview from '../Falureview'

export default class Home extends Component {
  state = {topratedbook: [], isloading: 'loading'}

  componentDidMount() {
    this.ratedbooks()
  }

  retry = () => this.ratedbooks()

  errorres = () => <Falureview onclick={this.retry} />

  ratedbooks = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const responce = await fetch(
      'https://apis.ccbp.in/book-hub/top-rated-books',
      options,
    )
    const data = await responce.json()
    if (responce.ok === true) {
      const book = data.books.map(each => ({
        id: each.id,
        title: each.title,
        authorName: each.author_name,
        coverPic: each.cover_pic,
      }))
      this.setState({isloading: 'sucsess', topratedbook: book})
    } else {
      this.setState({isloading: 'error'})
    }
  }

  bookshelvs = () => {
    const {history} = this.props

    history.push('/bookshelves')
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  rendertopbooks = () => {
    const {topratedbook} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <div className="carosal">
        <h1>Find your next favorate book</h1>
        <p>You are in the right place.</p>
        <div className="topbookcard">
          <div className="head">
            <h2>Top Rated Books</h2>
            <button onClick={this.bookshelvs} type="button">
              Find Books
            </button>
          </div>

          <Slider {...settings}>
            {topratedbook.map(each => (
              <Topbook list={each} key={each.id} />
            ))}
          </Slider>
        </div>

        <Support />
      </div>
    )
  }

  renderbla = () => {
    const {isloading} = this.state
    switch (isloading) {
      case 'loading':
        return this.renderLoadingView()
      case 'sucsess':
        return this.rendertopbooks()
      case 'error':
        return this.errorres()

      default:
        break
    }
    return null
  }

  render() {
    return (
      <>
        <Header />

        {this.renderbla()}

        {/* {isloading ? this.renderLoadingView() : this.rendertopbooks()} */}
      </>
    )
  }
}
