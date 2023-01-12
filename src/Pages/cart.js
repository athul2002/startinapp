import React, {useEffect, useState} from 'react'
import './cart.css'
import axios from 'axios';

function Cart({cart, setCart}) {
  const [total, setTotal] = useState(0)
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [add1, setAdd1] = useState("");
  const [add2, setAdd2] = useState("");

  const placeOrder = async() => {
    setAddress(add1.concat(add2));
    console.log(address)
    
    const { data } = await axios.post('https://food-app-2ekh.onrender.com/api/order', {
      name: name,
      phoneNumber: phone,
      address: address,
      orders: JSON.stringify(cart),
      payment: total,
    })
    console.log(data)
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
    {
      cart.map((item) => {
        return(<div className='cart-item'>
        <table>
          <tr>
            <th>Item</th>
            <th>Rate</th>
            <th>Quantity</th>
            <th>Price</th>
            <th onClick={() => {
                let newArr = [...cart]
                setCart(newArr.filter((e) => e.name != item.name));
          }}>Remove</th>

          </tr>
          <tr>
            <td>Emil</td>
            <td>Tobias</td>
            <td>Linus</td>
          </tr>
          <tr>
            <td>16</td>
            <td>14</td>
            <td>10</td>
          </tr>
        </table>
          <div>{item.name}</div>
          <div>{item.price}</div>
          <div>{item.quantity}</div>
          <div>{item.totalPrice}</div>
          <div onClick={() => {
                let newArr = [...cart]
                setCart(newArr.filter((e) => e.name != item.name));
          }}>Remove</div>
          </div>);
{/* <div className="item">
    <div className="item-detail">
      <h5 className="item-title">{item.name}</h5>
      <div className="item-cal">
        <div>
          <button className="minus"><i class="fas fa-minus"></i></button>
          <span className="amount">{item.price}</span>
          <button className="plus"><i class="fas fa-plus"></i></button>
        </div>
        <span className="price">&#x20B9; {item.price}</span>
      </div>
    </div>
</div> */}
        // );
      })
    }
    <div><div>Total</div><div>$ {total}</div></div>
    <input placeholder='Name' onChange={(e) => {setName(e.target.value)}}/>
    <input placeholder='Address' onChange={(e) => {setAdd1(e.target.value)}}/>
    <select onChange={(e) => {setAdd2(e.target.value)}}>
      <option value='Kalam'>Kalam</option>
      <option value='CVR'>CVR</option>
      <option value='Aryabhatta'>Aryabhatta</option>
      <option value='Aasima'>Aasima</option>
      <option value='Other'>Other</option>
    </select>
    <input type="text" placeholder='Phone' onChange={(e) => {setPhone(e.target.value)}}/>
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
<div onClick={placeOrder}>Checkout</div>
    </div>
    

  )
}

export default Cart