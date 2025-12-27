import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@fontsource-variable/montserrat";
import "@fontsource/cairo";
import './index.css'
import 'swiper/css';
import App from './App.jsx'
import { Provider } from 'react-redux';
import {store} from './Store/store.js';
import { CartProvider } from './context/CartContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import { ToasterProvider } from './context/ToasterContext.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
    <WishlistProvider>
    <CartProvider>
      <ToasterProvider>
        <App />
      </ToasterProvider>
    </CartProvider>
    </WishlistProvider>
  </Provider>
  
  </StrictMode>,
)
