import React, { createContext, useContext, useReducer } from 'react';

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, price: action.price, qty: action.qty, size: action.size }];
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;
        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    console.log(food.qty, parseInt(action.qty), action.price + food.price)
                    arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
                }
                return arr
            })
            return arr
        default:
            return null;
    }
};

const CartContext = createContext();
const DispatchContext = createContext(); // Dispatch should not have a default value

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);


    return (
        <CartContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
export const useDispatchCart = () => useContext(DispatchContext);
