// frontend/src/App.js

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import RecipeForm from "./components/RecipeForm";
import RecipeDisplay from "./components/RecipeDisplay";
import { getBooks } from './store/books';
import BooksDisplay from "./components/BooksDisplay";
import AuthRoute from "./components/AuthRoute";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    console.log('this ran', isLoaded)
    dispatch(sessionActions.restoreUser())
  }, [dispatch]);

  useEffect(() => {
    if(user) {
      dispatch(getBooks())
        .then(() => setIsLoaded(true))
    } else {
      setIsLoaded(true)
    }
  }, [user])

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route exact={true} path="/" >
            <LoginFormPage />
          </Route>
          <Route exact={true} path="/signup">
            <SignupFormPage />
          </Route>
          <AuthRoute exact={true} path='/new-recipe'>
            <RecipeForm />
          </AuthRoute>
          <AuthRoute exact={true} path='/recipe'>
            <RecipeDisplay />
          </AuthRoute>
          <AuthRoute isLoaded={isLoaded} exact={true} path='/:bookid'>
            <BooksDisplay />
          </AuthRoute>
        </Switch>
      )}
    </>
  );
}

export default App;
