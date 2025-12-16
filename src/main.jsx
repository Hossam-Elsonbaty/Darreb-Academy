import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@fontsource-variable/montserrat";
import "@fontsource/cairo";
import './index.css'
import 'swiper/css';
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from './Store/store.js';
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  </StrictMode>,
)
