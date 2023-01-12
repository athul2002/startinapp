import React, {useEffect, useState} from 'react'
import './cart.css'
import Modal from 'react-modal';
import axios from 'axios';
import GooglePayButton from '@google-pay/button-react'

function Cart({cart, setCart}) {
  const [total, setTotal] = useState(0)
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [add1, setAdd1] = useState("");
  const [add2, setAdd2] = useState("Kalam");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const placeOrder = async() => {
    if(cart.length === 0) {
      setError("*Your cart is empty!");
      return;
    }
    if(!name || !add1 || !add2 || !phone) {
      setError("*All fields are mandatory!");
      return;
    }
    if(phone.length != 10 || phone.match(/^[0-9]+$/) == null) {
      setError("*Invalid phone number!");
      return;
    }
    setError("");
    
    const { data } = await axios.post('https://food-app-2ekh.onrender.com/api/order', {
      name: name,
      phoneNumber: phone,
      address: add1,
      hostal: add2,
      orders: JSON.stringify(cart),
      payment: total,
    }).then(() => {setCart([]); setSuccess(true); setTimeout(() => window.location.href = '/', 1000);})
  }

  useEffect(() => {
    var totalAmount = 0;
    cart.map(item => {
      totalAmount += item.totalPrice
    })
    setTotal(totalAmount);
  }, [cart])
  return (
    <div id="cart">
      {/* <div id="title">02 CHECK OUT</div>
<div id="container">
  <div id="header">
    <i class="fas fa-bars"></i>
    <h3>My Cart</h3>
    <i class="fas fa-shopping-bag"></i>
  </div>
  <div id="checkout-page"> */}
{cart.length > 0 ? <>
    <div id="cart-items">
        <table>
          <tr>
            <th>Item</th>
            <th>Rate</th>
            <th>Quantity</th>
            <th>Price</th>
            <th></th>
          </tr>
          {cart.map((item) => {
          return(
            <tr>
            <td>{item.name}</td>
            <td>&#x20B9; {item.price}</td>
            <td>{item.quantity}</td>
            <td>&#x20B9; {item.totalPrice}</td>
            <td onClick={() => {
                  let newArr = [...cart]
                  setCart(newArr.filter((e) => e.name !== item.name));
            }}>Remove</td>
          </tr>)})}

        </table>

    <div id="total"><div>Total</div><div>  &#x20B9;{total}</div></div>
</div>
            <div>
    <div id="delivery">Provide your delivery details below</div>
    <input placeholder='Name' onChange={(e) => {setName(e.target.value)}}/>
    <input placeholder='Address (short description)' onChange={(e) => {setAdd1(e.target.value)}}/>
    <select value={add2} onChange={(e) => {setAdd2(e.target.value)}}>
      <option default value='Kalam' key='kalam'>Kalam</option>
      <option value='CVR' key='cvr'>CVR</option>
      <option value='Aryabhatta' key='aryabhatta'>Aryabhatta</option>
      <option value='Aasima' key='aasima'>Aasima</option>
      <option value='Other' key='other'>Other</option>
    </select>
    <input type="tel" placeholder='Phone (+91)' maxLength={10} onChange={(e) => {setPhone(e.target.value)}}/>
    </div>
    {/* <div class="item">
      <img class="item-image" src="https://goo.gl/NFcM8P"/>
      <div class="item-detail">
        <h5 class="item-title">Yellow Concrete Planter + Cactus</h5>
        <div class="item-cal">
          <div>
            <button class="minus"><i class="fas fa-minus"></i></button>
            <span class="amount">1</span>
            <button class="plus"><i class="fas fa-plus"></i></button>
          </div>
          <span class="price">$ 16</span>
        </div>
      </div>
</div>
    <div class="item">
      <img class="item-image" src="https://goo.gl/HXSKjE"/>
      <div class="item-detail">
        <h5 class="item-title">Concrete Cactus Pot White + Cactus / Succulent</h5>
        <div class="item-cal">
          <div>
            <button class="minus"><i class="fas fa-minus"></i></button>
            <span class="amount">1</span>
            <button class="plus"><i class="fas fa-plus"></i></button>
          </div>
          <span class="price">$ 18</span>
        </div>
      </div>
</div>
    <div class="item">
      <img class="item-image" src="https://goo.gl/GMM45u"/>
      <div class="item-detail">
        <h5 class="item-title">Concrete Cactus Pot, Turquoise Succulent</h5>
        <div class="item-cal">
          <div>
            <button class="minus"><i class="fas fa-minus"></i></button>
            <span class="amount">1</span>
            <button class="plus"><i class="fas fa-plus"></i></button>
          </div>
          <span class="price">$ 20</span>
        </div>
      </div>
    </div> */}
    {/* <button id="checkout">CHECKOUT</button>
  </div>
  <div id="payment-page">
    <div id="credit-card-current" class="credit-card">
      <h3 id="card-number">1234 ∙∙∙∙ ∙∙∙∙ 5678</h3>
      <h1 id="card-decor">VISA</h1>
    </div>
    <ul class="card-list">
      <li class="card-list-item">CARD DETAILS</li>
      <li class="card-list-item">
        <span>Name</span>
        <span>Michelle</span>
      </li>
      <li class="card-list-item">
        <span>Number</span>
        <span>1234 5678 1234 5678</span>
      </li>
      <li class="card-list-item">
        <span>Date</span>
        <span>08 / 20</span>
      </li>
    </ul>
    <button id="payment">PAY NOW</button>
  </div>
</div> */}
{error ? <div>{error}</div> : null}
<div id="checkout" onClick={placeOrder}>Checkout</div> 
<Modal isOpen={success} id="modal">
<div>Your order has been successfully placed! Our delivery executive will contact you shortly. Enjoy your meal :&#41;</div>
</Modal>
</> : <div>Your cart is empty at the moment. Add items to the cart from the <a href="/">main page</a>.</div>}
    </div>
    

  )
}

export default Cart