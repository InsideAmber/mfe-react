import { mount } from "dashboard/DashboardApp" //dashboard is remote module name and DashboardApp is the exposed module in marketing dev config
import React, { useRef, useEffect } from "react";

export default () => {
  const ref = useRef(null);

  useEffect(() => {
   mount(ref.current)
  },[]);

  return <div ref={ref} />;
};
