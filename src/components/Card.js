import React, { useEffect, useRef, useState } from 'react';
import { useCart,useDispatchCart } from './ContextReducer';

function Card(props) {
    const option=props.options
    const toptions=Object.keys(option)
    let fooditem=props.foodItems
    let priceRef=useRef()
    const [qty,setQty]=useState(1)
    const [size,setSize]=useState("")
    
    let finalprice=qty*parseInt(option[size])
    const dispatch=useDispatchCart()
    const data=useCart()

    
    const handlecart =async()=>{
        let food = []
    for (const item of data) {
      if (item.id === fooditem._id) {
        food = item;

        break;
      }
    }
    console.log(food)
    console.log(new Date())
    if (food.length !== 0) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: fooditem._id, price: finalprice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: fooditem._id, name: fooditem.name, price: finalprice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }

    await dispatch({ type: "ADD", id: fooditem._id, name: fooditem.name, price: finalprice, qty: qty, size: size })

    }
    useEffect(()=>{
        setSize(priceRef.current.value)
    },[])
    return (
        <div>
            <div>
                <div className="card mt-1 text-white" style={{ width: "18rem", maxHeight: "360px", backgroundColor: "black" }}>
                    <img className="card-img-top" src={fooditem.img} alt="Card image cap" style={{height:"130px",objectFit:"fill"}} />
                    <div className="card-body">
                    <h5 className="card-title" style={{textColor: "white"}}>{fooditem.name}</h5>

                        
                        <div className='container w-100'>
                            <select className='m-2 h-100 bg-success' onChange={(e)=>{setQty(e.target.value)}}>
                                {Array.from(Array(6)).map((_, i) => {
                                    return (<option key={i + 1} value={i + 1}>{i + 1}</option>)
                                })}
                            </select>
                            <select className='m-2 h-100 bg-success rounded ' ref={priceRef} onChange={(e)=>{setSize(e.target.value)}}>
                                {
                                    toptions.map((data)=>{
                                        return(
                                            <option key={data} value={data}>{data}</option>
                                        )
                                    })
                                }
                            </select>
                            <div className='d-inline' style={{ height: "100%", fontSize: "1.25rem" }}>{finalprice}/-</div>
                            <hr>
                            </hr>
                            <button className={"btn btn-success justify-center ms-2"} onClick={handlecart}>Add to Cart</button>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
