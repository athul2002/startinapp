import React, {useEffect, useState} from 'react'
import './cart.css'
import Modal from 'react-modal';
import axios from 'axios';
import trashIcon from './trash.svg'
import successIcon from './success.svg'

function Cart({cart, setCart}) {
  const [total, setTotal] = useState(0)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [add1, setAdd1] = useState("");
  const [add2, setAdd2] = useState("Kalam");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const HandleSubmit = async() => {

    const data = await axios.post('https://food-app-2ekh.onrender.com/api/order', {
      name: name,
      phoneNumber: phone,
      address: add1,
      hostal: add2,
      orders: JSON.stringify(cart),
      payment: total,
    }).then(() => {setCart([]); setSuccess(true)})
  }
  

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

    const items = await axios.get('https://food-app-2ekh.onrender.com/api/working').then((res) => {
      cart.map(item => {
        console.log(res.data.filter(e => e.name === item.name))
          if(res.data.filter(e => e.name === item.name)|| !cart[cart.findIndex(e => e.name === item.name)].isAvailable) {
            setCart([...cart.filter(e => e.name != item.name)]);
            setError("*Some item(s) in your cart is/are unavailable at the moment and have been removed from your cart.");
            return res.data;
          }
        });
    }).then(()=>{if(!error) {axios.post('https://food-app-2ekh.onrender.com/api/order', {
      name: name,
      phoneNumber: phone,
      address: add1,
      hostal: add2,
      orders: JSON.stringify(cart),
      payment: total,
    }).then(() => {setCart([]); setSuccess(true)})}});

    

    // const data = await axios.post('https://food-app-2ekh.onrender.com/api/order', {
    //   name: name,
    //   phoneNumber: phone,
    //   address: add1,
    //   hostal: add2,
    //   orders: JSON.stringify(cart),
    //   payment: total,
    // }).then(() => {setCart([]); setSuccess(true)})
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
{cart.length > 0 ? <>
    <div id="cart-items">
        <table className="table table-hover">
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
            }}><img id="remove-cart" height="20px" src={trashIcon}/></td>
          </tr>)})}

        </table>
            <hr/>
    <div id="total"><div>Total</div><div>  &#x20B9;{total}</div></div>
</div>
            <div id="delivery-info">
    <div id="delivery">Please provide your delivery details below</div>
    <input class="form-control" placeholder='Name' onChange={(e) => {setName(e.target.value)}}/>
    <input class="form-control" placeholder='Address (short description)' onChange={(e) => {setAdd1(e.target.value)}}/>
    <div class="input-group mb-3">
  <div class="input-group-prepend">
    <label class="input-group-text" for="inputGroupSelect01">Hostel/Vicinity</label>
  </div>
  <select class="custom-select" id="inputGroupSelect01" value={add2} onChange={(e) => {setAdd2(e.target.value)}}>
  <option default value='Kalam' key='kalam'>Kalam</option>
      <option value='CVR' key='cvr'>CVR</option>
      <option value='Aryabhatta' key='aryabhatta'>Aryabhatta</option>
      <option value='Aasima' key='aasima'>Aasima</option>
      <option value='Faculty Quarters' key='faculty'>Faculty Quarters</option>
      <option value='D Quarters' key='dquarters'>D Quarters</option>
      <option value='Other' key='other'>Other</option>
  </select>
</div>
    <div class="input-group input-group-sm mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroup-sizing-sm">+91</span>
  </div>
  <input type="tel" placeholder='Phone' maxLength={10} onChange={(e) => {setPhone(e.target.value)}} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
</div>
    </div>

{error ? <div>{error}</div> : null}
<div id="checkout" onClick={placeOrder}>Checkout</div> 

</> : <div id="empty-cart-msg">Your cart is empty at the moment. Add items to the cart from the <a href="/">main page</a>.</div>}
<Modal isOpen={success} id="modal">
<div id="close-btn" onClick={() => {
  // setSuccess(false);
  window.location.href = '/';
}}>X</div>
<img height="250px" src={successIcon}/>
<div>Your order has been successfully placed! Our delivery executive will contact you shortly. Enjoy your meal :&#41;</div>
</Modal>
    </div>
    

  )
}

export default Cart