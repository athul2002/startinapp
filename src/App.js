import React, {useEffect, useState} from 'react'
import logo from './logo.svg';
import './App.css';
import Main from './Pages/main';
import Cart from './Pages/cart';
import {BrowserRouter,Routes,Route, Link} from "react-router-dom";
import phoneIcon from '../src/Pages/phone.svg'
import mailIcon from '../src/Pages/mail.svg'

function App() {
  const [cart, setCart] = useState ( () => {
    const savedItem = localStorage.getItem('Cart');
   const parsedItem = JSON.parse(savedItem);
   return parsedItem || [];
   });

  useEffect(() => {
    localStorage.setItem('Cart', JSON.stringify(cart));
  }, [cart]);


  return (
    <div id="parent">
        {/* <header id="header"> */}
    <nav id="nav-bar">
      <a className="nav-link" href="/">I.T.I. Dhaba</a>
      <a className="nav-link" href="/cart">Cart</a>


      {/* <Link to='/'>ITI Dhaba</Link>
      <Link to='/cart'>Cart</Link>  */}
    </nav>
      <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main cart={cart} setCart={setCart} />}/>
      <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />}/>
    </Routes>
    </BrowserRouter>
    <footer>
    <a href="tel:7025482101"><img height="20px" src={phoneIcon}/>+91 70254 82101</a>
    <a href="mailto:adiljamal221101@gmail.com"><img height="20px" src={mailIcon}/> adiljamal221101@gmail.com</a>
    </footer>
    </div>

  );
}

export default App;
