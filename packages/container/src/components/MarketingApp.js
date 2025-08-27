import { mount } from "marketing/MarketingApp";   //marketing is remote module name and MarketingApp is the exposed module in marketing dev config
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const {onParentNavigate} = mount(ref.current, {
      onNavigate: ({pathname:nextPathname}) => {
        const { pathname } = history.location;

        if (pathname !== nextPathname){
        history.push(nextPathname);
        }
      }
    });
    history.listen(onParentNavigate);
  },[]);

  return <div ref={ref} />;
};
