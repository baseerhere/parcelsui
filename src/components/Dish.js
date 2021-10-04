import React, { useState } from 'react'
import { toJS } from 'mobx'
import Store from '../store'
import { createSession, createOrder, getSessionOrders } from '../service'

export default function Dish(props) {
    const initialDishOrder = {
        orderCount: 0,
        dishId: null
    }
    const [dishOrder, setDishOrder] = useState(initialDishOrder);

    const decrementOrder = e => {
        const clonedState = { ...dishOrder };
        if (clonedState.orderCount > 0) {
            clonedState.orderCount = clonedState.orderCount - 1;
        }
        setDishOrder(clonedState);
    }
    const incrementeOrder = e => {
        const dishId = e.currentTarget.attributes['dishid'].value;
        const clonedState = { ...dishOrder };
        if (clonedState.orderCount < 5) {
            clonedState.orderCount = clonedState.orderCount + 1;
            clonedState.dishId = dishId;
        }
        setDishOrder(clonedState);
    }

    const addToOrder = async () => {
        let currentSessionId = toJS(Store.selectedSessionId);
        if (!currentSessionId) {
            const sessionCreated = await createSession();
            currentSessionId = sessionCreated._id;
            Store.addInOrderSession(sessionCreated);
        }
        const orderObject = {
            dishId: dishOrder.dishId,
            quantity: dishOrder.orderCount,
            sessionId: currentSessionId
        }
        await createOrder(orderObject);
        setDishOrder(initialDishOrder);
    }

    return (
        <div className="dishContainer">
            <div className="dishTitle">{props.dishName}</div>
            <div className="dishIconContainer"><img src={"/dishimages/" + props.fileName} alt={props.dishName} className="dishIcon" /></div>
            <div className="dishPrice">Rs {props.price}/-</div>
            <div className="dishOrderSection">
                <div className="dishOrderBorder">&nbsp;</div>
                <div className="dishPlusMinus"><img src="/minus.png" alt="-" dishid={props.dishid} onClick={decrementOrder} /></div>
                <div className="dishOrderCount">{dishOrder.orderCount}</div>
                <div className="dishPlusMinus"><img src="/plus.png" alt="+" dishid={props.dishid} onClick={incrementeOrder} /></div>
                <div className="dishOrderBorder">&nbsp;</div>
            </div>
            <div onClick={addToOrder} className={dishOrder.orderCount === 0 ? "dishOrderButton disabledButton" : "dishOrderButton"}>Order</div>
        </div>
    )
}
