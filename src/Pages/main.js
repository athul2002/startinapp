import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { Audio } from 'react-loader-spinner'
import './main.css';


function Main({cart, setCart}) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log('Load')
    setLoading(true);
    axios.get('https://food-app-2ekh.onrender.com/api/working').then((res) => {setOpen(res.data[0].isAvailable); console.log(res.data[0].isAvailable); setLoading(false)});
    setLoading(true);
    axios.get('https://food-app-2ekh.onrender.com/api/food').then((res) => {setItems(res.data); console.log(res.data); setLoading(false)})
    // console.log(cart)
  }, []);
  return (
    // <div>main</div>
    <article id="foods">
    {loading ? 
      <Audio
        height="120"
        width="120"
        radius="9"
        color="black"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
     : null}
    {open ? 
      <div id="list">
        {items.map((item) => {
          return(<div className="products" id="prod1">
            <h3>{item.name}</h3>
            <div>{item.offerPrice ? <span id="prev-price">&#x20B9; {item.price} </span> : null}{item.offerPrice ? <span>&#x20B9; {item.offerPrice}</span> : <span>{item.Price}</span>}</div>
            <img className="prod-pic" src={item.pic}/>
            <div>{item.availability ? <div id="add-to-cart" onClick={() => {
              if (cart.find(e => e.name === item.name)) {
                const index = cart.findIndex(e => e.name === item.name)
                let newArr = [...cart]
                newArr[index].quantity = newArr[index].quantity+1
                newArr[index].totalPrice = newArr[index].quantity*newArr[index].price
                setCart(newArr);
              }
              else {
              setCart([{
                name: item.name,
                price: item.offerPrice ? item.offerPrice : item.price,
                quantity: 1,
                totalPrice: item.offerPrice ? item.offerPrice : item.price
              }, ...cart])
            }
            }}>Add to Cart</div> : <div>N/A</div>}</div>
          </div>)
        })}
        </div> : !loading ? <div id="closed-delivery">We are currently not taking any orders :&#40;. Please contact us for any queries/grievance addressals.</div> : null}
    </article>
  )
}

export default Main