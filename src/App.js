import React, {useEffect, useState} from 'react'
import logo from './logo.svg';
import './App.css';
import Main from './Pages/main';
import Cart from './Pages/cart';
import {BrowserRouter,Routes,Route, Link} from "react-router-dom";
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
    <>
        {/* <header id="header"> */}
    <nav id="nav-bar">
      <a class="nav-link" href="/">I.T.I. Dhaba</a>
      <a class="nav-link" href="/cart">Cart</a>


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
    <p>by Aman Srivastav 13-08-2018 </p>
    </footer>
    </>

  );
}

export default App;
