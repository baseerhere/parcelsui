// mobx stuff
import { makeAutoObservable } from 'mobx';
import { toJS } from 'mobx'

// lodash
import _ from 'lodash'

// service call for fetching cuisines
import { buildCusines } from '../service'

class Store {
    dishes = []
    cuisines = []
    selectedSessionId = null
    orders = []
    inOrderSessions = []

    constructor() {
        makeAutoObservable(this);
    }

    setDishes = dishes => {
        this.dishes = dishes;
        this.cuisines = buildCusines(dishes);
    }

    setCurrentSessionId = sessionId => {
        this.selectedSessionId = sessionId;
    }

    switchSession = sessionId => {
        this.selectedSessionId = sessionId;
    }

    addInOrderSession = session => {
        this.selectedSessionId = session._id;
        let element = _.find(toJS(this.inOrderSessions), o => o._id === session._id);
        if (!element) {
            this.inOrderSessions.push(session);
        }
    }

    updateSessionStatus = (sessionId, status) => {
        if (toJS(this.selectedSessionId) === sessionId) {
            this.selectedSessionId = null;
        }

        let elementIndex = _.findIndex(toJS(this.inOrderSessions), o => o._id === sessionId);
        if (elementIndex !== -1) {
            this.inOrderSessions[elementIndex].sessionStatus = status;
        }
    }

    addNewOrder = order => {
        let element = _.find(toJS(this.orders), o => o._id === order._id);
        if (!element) {
            this.orders.push(order);
        }
    }

    setOrders = orders => {
        if (toJS(this.orders).length === 0) {
            this.orders = orders;
        }
    }

    setSessions = sessions => {
        if (toJS(this.inOrderSessions).length === 0) {
            this.inOrderSessions = sessions;
        }
    }
}

export default new Store();