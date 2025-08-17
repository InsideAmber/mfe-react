import { mount } from "marketing/MarketingApp";   //marketing is remote module name and MarketingApp is the exposed module in marketing dev config
import React, { useRef, useEffect } from "react";

export default () => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  });

  return <div ref={ref} />;
};
