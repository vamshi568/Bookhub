import {Link} from 'react-router-dom'

import './index.css'

const Topbook = props => {
  const {list} = props

  return (
    <div className="container">
      <Link to={`/bookshelves/${list.id}`} className="book">
        <img src={list.coverPic} alt={list.title} />
        <h3>{list.title}</h3>
        <p>{list.authorName}</p>
      </Link>
    </div>
  )
}
export default Topbook
