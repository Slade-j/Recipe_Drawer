// frontend/src/App.js

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import RecipeForm from "./components/RecipeForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route exact={true} path="/" >
            <Navigation isLoaded={isLoaded} />
            <LoginFormPage />
          </Route>
          <Route exact={true} path="/signup">
            <Navigation isLoaded={isLoaded} />
            <SignupFormPage />
          </Route>
          <Route exact={true} path='/new-recipe'>
            <RecipeForm />
          </Route>
          <Route exact={true} path='/recipe'>
            <h1>you made it!</h1>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
