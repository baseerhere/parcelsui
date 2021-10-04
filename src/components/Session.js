import React from 'react'

// mobx stuff
import { observer } from 'mobx-react';
import { toJS } from 'mobx'
import Store from '../store'

// lodash
import _ from 'lodash';

// api service
import { updateStatusToKitchen } from '../service'


// helper function to render the button below
const RenderConfirmButton = (props) => {
    if (props.sessionStatus === "inOrder") {
        return (
            <tr>
                <td colSpan="2">
                    <button type="button" name={props.name} onClick={props.sendToKitchen} className="btn btn-primary">Confirm Order</button>
                </td>
            </tr>
        )
    } else {
        return (<tr></tr>)
    }
}

const Session = observer(() => {

    const sendToKitchen = async (e) => {
        await updateStatusToKitchen(e.target.name);
        Store.updateSessionStatus(e.target.name, "inKitchen");
    }

    const selectedSessionId = toJS(Store.selectedSessionId);
    if (selectedSessionId === null) {
        return (
            <div></div>
        )
    }
    else {
        const selectedSessionOrders = _.filter(toJS(Store.orders), o => o.sessionId === selectedSessionId);
        const totalAmount = _.sumBy(selectedSessionOrders, o => o.totalPrice);

        const selectedSession = _.find(toJS(Store.inOrderSessions), s => s._id === selectedSessionId);
        return (
            <div>
                <table className="table table-striped">
                    <tbody>
                        {
                            _.map(selectedSessionOrders, function (order) {
                                return (<tr key={order._id}>
                                    <td>{order.dishName} x ({order.quantity})</td>
                                    <td style={{ textAlign: "right" }}>{order.totalPrice}/-</td>
                                </tr>)
                            })
                        }
                        <tr key="total">
                            <td><b>Total</b></td>
                            <td style={{ textAlign: "right" }}><b>{totalAmount}/-</b></td>
                        </tr>
                        {
                            <RenderConfirmButton name={selectedSession._id} sendToKitchen={sendToKitchen} sessionStatus={selectedSession.sessionStatus} />
                        }
                    </tbody>
                </table>

            </div>
        )
    }

})

export default Session;
