import React, {lazy, Suspense, useState} from "react";
import { BrowserRouter,Route,Switch} from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import Progress from "./components/Progress";
import Header from "./components/Header";

const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const AuthLazy = lazy(() => import("./components/AuthApp"));


const generateClassName = createGenerateClassName({
  productionPrefix: "co", // co for container
});

export default () => {
const [isSignedIn,setIsSignedIn] = useState(false);
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header onSignOut={()=>setIsSignedIn(false)} isSignedIn={isSignedIn}/>
          <Suspense fallback={<Progress/>}>
          <Switch>
             {/* first path should be matched to route any page like if we are routing /auth/signin. so
            first part is /auth it will still take to AuthApp */}
            <Route path ="/auth">
            <AuthLazy onSignIn={()=>setIsSignedIn(true)}/>
            </Route>
            <Route path ="/" component ={MarketingLazy}/>
          </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};
