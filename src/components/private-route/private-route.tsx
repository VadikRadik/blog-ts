import { Redirect } from 'react-router-dom'

export type PrivateRouteProps = {
  isLoggedIn: boolean
  privateElement: JSX.Element
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isLoggedIn, privateElement }) => {
  if (isLoggedIn) {
    return privateElement
  } else {
    return <Redirect to='/sign-in' />
  }
}

export default PrivateRoute
