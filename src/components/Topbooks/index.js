import {Link} from 'react-router-dom'

import './index.css'

const Topbook = props => {
  const {list} = props

  return (
    <li className="container">
      <Link to={`/shelf/${list.id}`} className="book">
        <img src={list.coverPic} alt={list.title} />
        <h3>{list.title}</h3>
        <p>{list.authorName}</p>
      </Link>
    </li>
  )
}
export default Topbook
