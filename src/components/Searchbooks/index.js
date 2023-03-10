import {Link} from 'react-router-dom'
import './index.css'

const Searchbooks = props => {
  const {list} = props
  return (
    <Link to={`/shelf/${list.id}`} className="link">
      <div className="ben">
        <img src={list.coverPic} alt={list.title} />
        <div>
          <h4>{list.title}</h4>
          <p>{list.authorName}</p>
          <p>{list.rating}</p>
          <p>{list.readStatus}</p>
        </div>
      </div>
    </Link>
  )
}

export default Searchbooks
