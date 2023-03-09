import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Support from '../Support'
import Falureview from '../Falureview'
import './index.css'

export default class Booksdetails extends Component {
  state = {detailed: [], isLoading: ''}

  componentDidMount() {
    this.renderres()
  }

  renderres = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(
      `https://apis.ccbp.in/book-hub/books/${id}`,
      options,
    )
    const datar = await response.json()
    const data = datar.book_details
    if (response.ok === true) {
      const updatedData = {
        title: data.title,
        authorName: data.author_name,
        coverPic: data.cover_pic,
        aboutBook: data.about_book,
        rating: data.rating,
        readStatus: data.read_status,
        aboutAuthor: data.about_author,
      }

      this.setState({detailed: updatedData, isLoading: 'success'})
    } else {
      this.setState({isLoading: 'error'})
    }
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  rendererror = () => <Falureview onclick={this.renderres} />

  renderdetails = () => {
    const {detailed} = this.state
    const {
      title,
      authorName,
      coverPic,
      aboutBook,
      rating,
      readStatus,
      aboutAuthor,
    } = detailed
    return (
      <>
        <div className="hai">
          <img src={coverPic} alt={title} />
          <div>
            <h1>{title}</h1>
            <p>{authorName}</p>
            <p>{rating}</p>
            <p>{readStatus}</p>
          </div>
        </div>
        <div>
          <hr />
          <h1>About Author</h1>
          <p>{aboutAuthor}</p>
          <h1>About Book</h1>
          <p>{aboutBook}</p>
          <Support />
        </div>
      </>
    )
  }

  render() {
    const {isLoading} = this.state
    let content

    switch (isLoading) {
      case 'success':
        content = this.renderdetails()
        break
      case 'error':
        content = this.rendererror()
        break
      default:
        content = this.renderLoadingView()
    }

    return (
      <div>
        <Header />
        {content}
      </div>
    )
  }
}
