import React, {useEffect} from 'react';
import { useSelector } from "react-redux";
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = props => {
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    console.log(props.isLoaded, 'isLoaded')
    console.log(user, 'in Auth')
  }, [user])
  return (
    <Route {...props}>
      {(user)? props.children  : <Redirect to="/" />}
    </Route>
  )
};


export default AuthRoute;
