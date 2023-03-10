import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/login'
import Booksdetails from './components/Booksdetails'
import Bookshelves from './components/Bookshelves'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/shelf" component={Bookshelves} />
    <ProtectedRoute exact path="/shelf/:id" component={Booksdetails} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
