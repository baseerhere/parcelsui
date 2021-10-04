import React, { useEffect } from 'react'

// api service 
import { populateOrders, populateSessions, updateStatusToDelivered } from '../service'

// mobx stuff
import Store from '../store'
import { observer } from 'mobx-react';
import { toJS } from 'mobx'

// lodash
import _ from 'lodash'

// helper function to render the button below
const RenderDilverButton = (props) => {
    if (props.sessionStatus === "inKitchen") {
        return (
            <tr>
                <td>
                    <button type="button" name={props.name} onClick={props.sendToDelivered} className="btn btn-primary">Deliver Order</button>
                </td>
            </tr>
        )
    } else {
        return (<tr></tr>)
    }
}

const Kitchen = observer(() => {
    const allSessions = toJS(Store.inOrderSessions);
    const allOrders = toJS(Store.orders);

    const sendToDelivered = async (e) => {
        await updateStatusToDelivered(e.target.name);
        Store.updateSessionStatus(e.target.name, "delivered");
    }

    const inKitchenSessions = _.chain(allSessions)
        .filter(o => o.sessionStatus === "inKitchen")
        .map(s => {
            let sessionOrders = _.filter(allOrders, o => o.sessionId === s._id);
            return { ...s, orders: sessionOrders };
        })
        .value();

    useEffect(async () => {
        const { data: orders } = await populateOrders();
        const { data: sessions } = await populateSessions();
        Store.setOrders(orders);
        Store.setSessions(sessions);
    }, []);

    return (
        <div style={{ "textAlign": "left" }}>
            <div className="kitchenOrderSection">
                {
                    _.map(inKitchenSessions, function (session) {
                        return (
                            <div key={session._id} style={{ "border": "1px solid", "borderRadius": "4px", "margin": "2px" }}>
                                <table className="table table-striped">
                                    <tbody>
                                        <tr key="billRow">
                                            <td><b>Bill Id: {session.sessionId}</b></td>
                                        </tr>
                                        {
                                            <RenderDilverButton name={session._id} sessionStatus={session.sessionStatus} sendToDelivered={sendToDelivered} />
                                        }
                                        {
                                            _.map(session.orders, function (order) {
                                                return (<tr key={order._id}>
                                                    <td>{order.dishName} x ({order.quantity})</td>
                                                </tr>)
                                            })

                                        }

                                    </tbody>
                                </table>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
})

export default Kitchen;