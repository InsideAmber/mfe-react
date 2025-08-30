import {createApp} from 'vue'
import Dashboard from './components/Dashboard.vue'  
// Mount function to start up the app
const mount = (el) => {

  const app = createApp(Dashboard);
   app.mount(el); //this is not recursive mount function. it is vue method to mount the component

};

// If we are in devlopment and in isolation,
// call the mount function immediately

if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_dashboard-dev-root");
  if (devRoot) {
    mount(devRoot);
  }
}

// We are running through the container
// Then we should export the mount function

export { mount };
