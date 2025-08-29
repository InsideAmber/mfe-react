import { mount } from "auth/AuthApp";   //auth is remote module name and AuthApp is the exposed module in marketing dev config
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default ({onSignIn}) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const {onParentNavigate} = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({pathname:nextPathname}) => {
        const { pathname } = history.location;

        if (pathname !== nextPathname){
        history.push(nextPathname);
        }
      },
     onSignIn,
    });
    history.listen(onParentNavigate);
  },[]);

  return <div ref={ref} />;
};
