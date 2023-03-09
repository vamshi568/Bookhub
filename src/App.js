import {Switch, Route} from 'react-router-dom'
import './App.css'
import Login from './components/login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Booksdetails from './components/Booksdetails'
import Bookshelves from './components/Bookshelves'
import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/bookshelves" component={Bookshelves} />
    <ProtectedRoute exact path="/bookshelves/:id" component={Booksdetails} />
    <Route component={NotFound} />
  </Switch>
)

export default App
