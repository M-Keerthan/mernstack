import React from 'react'
import Delete from '@material-ui/icons/Delete'

import { useCart, useDispatchCart } from '../components/ContextReducer';
export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();
    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
            </div>
        )
    }
    // const handleRemove = (index)=>{
    //   console.log(index)
    //   dispatch({type:"REMOVE",index:index})
    // }
    console.log(data)

    const handleCheckOut = async () => {

    }

    let totalPrice = data.reduce((total, food) => total + food.price, 0)
    return (
        <div>

            {console.log(data)}
            <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
                <table className='table table-hover '>
                    <thead className=' text-success fs-4'>
                        <tr>
                            <th scope='col' >#</th>
                            <th scope='col' >Name</th>
                            <th scope='col' >Quantity</th>
                            <th scope='col' >Option</th>
                            <th scope='col' >Amount</th>
                            <th scope='col' ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food1, index) => (
                            <tr>
                                <th scope='row' >{index + 1}</th>
                                <td style={{ color: "white" }}>{food1.name}</td>

                                <td style={{ color: "white" }}>{food1.qty}</td>
                                <td style={{ color: "white" }}>{food1.size}</td>
                                <td style={{ color: "white" }}>{food1.price}</td>
                                <td ><button type="button" className="btn p-0"><img src="" alt="delete" onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div><h1 className='fs-2' style={{ color: "white" }}>Total Price: {totalPrice}/-</h1></div>
                <div>
                    <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
                </div>
            </div>



        </div>
    )
}