import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dbs9akgm5/image/upload/v1678361267/page_not_found_dqs77l.png"
      alt="not found"
      className="not-found-img"
    />
    <h1>Page Not Found</h1>
    <p>we are sorry, the page you requested could not be found</p>
    <Link to="/">
      <button type="button">Go Back to Home</button>
    </Link>
  </div>
)

export default NotFound
