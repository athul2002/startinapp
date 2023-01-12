import React, {useEffect, useState} from 'react'
import axios from 'axios';
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
    <h2>List of currently available products:</h2>
    {loading ? <div>Loading...</div> : null}
      <div id="list">
        {items.map((item) => {
          return(<div className="products" id="prod1">
            <h3>{item.name}</h3>
            <div>{item.offerPrice ? <span>&#x20B9; {item.price} </span> : null}{item.offerPrice ? <span>&#x20B9; {item.offerPrice}</span> : <span>{item.Price}</span>}</div>
            <img className="prod-pic" src={item.pic}/>
            <div>{item.availability ? <div onClick={() => {
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
      {/* <div class="products" id="prod1">
        <h3>Biryani</h3>
        <p>1 Full</p>
        <p><strong>&#x20B9; 250</strong></p>
        <img class="prod-pic" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ1acwtSYSt5N7HTgS1k4_PjwAret2CdE_lLA37sO-nGQzImIesA"/>
        </div>
      <div class="products" id="prod2">
        <h3>Butter Paneer</h3>
        <p>1 Full</p>
        <p><strong>&#x20B9; 120</strong></p>
        <img class="prod-pic" src="https://i1.wp.com/mypullzone.9vexd6dl53at.maxcdn-edge.com/wp-content/uploads/2017/04/paneer-butter-masala-recipe-step-by-step-instructions.jpg?fit=750%2C563"/>
        </div>
       <div class="products" id="prod3">
        <h3>Spring Roll</h3>
         <p>1 Piece</p>
        <p><strong>&#x20B9; 80</strong></p>
        <img class="prod-pic" src="https://images-gmi-pmc.edge-generalmills.com/79c6ac0a-67cc-4556-8d4c-3019280b52bc.jpg"/>
        </div>
        <div class="products" id="prod4">
        <h3>Cheese Pizza</h3>
         <p>1 Piece</p>
        <p><strong>&#x20B9; 99</strong></p>
        <img class="prod-pic" src="https://images-gmi-pmc.edge-generalmills.com/1c17d8fe-0583-49a6-9001-62a51cb09669.jpg"/>
        </div>
       <div class="products" id="prod5">
        <h3>Burger</h3>
         <p>One with cheese</p>
        <p><strong>&#x20B9; 99</strong></p>
         <img class="prod-pic" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX43pn0idyZ-ZamUOKmS_ZQpTMuoMmYW2VNNCQagcR-y-9rlA_"/>
         </div>
        <div class="products" id="prod6">
          <h3>Pasta</h3>
          <p>Red Chilli</p>
          <p><strong>&#x20B9; 69</strong></p>
          <img class="prod-pic" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXArpyx6L308WLB32RddFOfIBlGDGSkFUGNq7tpoGqHf0xcYpgIg"/>
        </div> */}
        </div>
    </article>
  )
}

export default Main