import React from 'react'

// mobx stuff
import { observer } from 'mobx-react';
import { toJS } from 'mobx'
import Store from '../store'

// lodash
import _ from 'lodash';

// helper function to append zeros before the number
const appendZeros = id => {
    return _.repeat("0", 4 - id.toString().length) + id.toString();
}

const SessionList = observer(() => {
    if (toJS(Store.inOrderSessions).length === 0) {
        return (
            <div></div>
        )
    }
    else {
        return (
            <div>
                <table className="table table-striped">
                    <tbody>
                        {
                            _.chain(toJS(Store.inOrderSessions))
                                .filter(x => x.sessionStatus !== "delivered")
                                .map(function (session) {
                                    return (<tr key={session._id}>
                                        <td>(<i>{session.sessionStatus}</i>)</td>
                                        <td onClick={e => Store.setCurrentSessionId(e.currentTarget.attributes['sessionid'].value)} sessionid={session._id} style={{ "cursor": "pointer" }}><b>{appendZeros(session.sessionId)}</b></td>
                                    </tr>)
                                }).value()
                        }
                    </tbody>
                </table>
            </div>
        )
    }

})

export default SessionList;
