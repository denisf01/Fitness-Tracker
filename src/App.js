import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Context, { ContextProvider } from "./store/context";
import { useContext } from "react";
import Header from "./components/MainPage/Header";
import { pages } from "./constants/pages";
function App() {
  const ctx = useContext(Context);
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route path={"/"} exact>
          <LandingPage />
        </Route>
        {pages.map((page) => {
          return (
            (page.isLoginReq ? ctx.isLoggedIn : !ctx.isLoggedIn) && (
              <Route key={Math.random().toString()} path={page.path} exact>
                {page.component}
              </Route>
            )
          );
        })}
        <Route path={"/"}>
          <Redirect to={"/"} />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
