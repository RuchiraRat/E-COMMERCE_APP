import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { Toaster } from 'react-hot-toast';
import NotFound from './components/NotFound';


const App = () => {
  return (
    <div>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'> {/* corrected typo */}
        <Navbar />
        <SearchBar />
        
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />  {/* lowercase productId */}
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/place-order' element={<PlaceOrder />} />
          <Route path='/orders' element={<Orders />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} /> {/* Catch-all for unknown URLs */}
        </Routes>
        
        <Footer />
      </div>
    </div>
  );
};

export default App;
