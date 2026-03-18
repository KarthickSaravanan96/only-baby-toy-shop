import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Layout from './components/layout/Layout';
import SplashScreen from './components/common/SplashScreen';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      {/* Splash screen — shown only on first load */}
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}

      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="product/:id" element={<ProductDetails />} />
              <Route path="cart" element={<Cart />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="orders" element={<MyOrders />} />
            </Route>
            {/* Admin Route - Outside of standard Layout */}
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
