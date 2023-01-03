import * as React from "react";
import Button from "@mui/material/Button";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SignInPage";
function App() {
  return (
    <div>
      <Switch>
        <Route path={"/"} exact>
          <LandingPage />
        </Route>
        <Route path={"/login"} exact>
          <SignInPage/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
