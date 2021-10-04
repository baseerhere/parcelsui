import axios from 'axios'

const DISHES_API = `${process.env.REACT_APP_API_BASE_URL}\dishes`
const SESSION_API = `${process.env.REACT_APP_API_BASE_URL}\sessions`
const ORDER_API = `${process.env.REACT_APP_API_BASE_URL}\orders`


const config = {
    headers: {
        "Authorization": localStorage.getItem("authToken"),
    }
}

export async function populateDishes() {
    try {
        const { data: dishes } = await axios.get(DISHES_API, config);
        return dishes;
    } catch (err) {
        console.log(err);
    }
}

export async function populateSessions() {
    try {
        const { data: sessions } = await axios.get(SESSION_API, config);
        return sessions;
    } catch (err) {
        console.log(err);
    }
}

export async function updateStatusToKitchen(sessionId) {
    try {
        debugger;
        const sessionOrdersApi = `${SESSION_API}/${sessionId}`;
        const { data: output } = await axios.patch(sessionOrdersApi, { "sessionStatus": "inKitchen" }, config);
        return output;
    } catch (err) {
        console.log(err);
    }
}

export async function updateStatusToDelivered(sessionId) {
    try {
        debugger;
        const sessionOrdersApi = `${SESSION_API}/${sessionId}`;
        const { data: output } = await axios.patch(sessionOrdersApi, { "sessionStatus": "delivered" }, config);
        return output;
    } catch (err) {
        console.log(err);
    }
}

export async function populateOrders() {
    try {
        const { data: orders } = await axios.get(ORDER_API, config);
        return orders;
    } catch (err) {
        console.log(err);
    }
}

export async function createSession() {
    try {
        const { data: session } = await axios.post(SESSION_API, {}, config);
        return session;
    } catch (err) {
        console.log(err);
    }
}

export async function createOrder(order) {
    try {
        const { data: createdOrder } = await axios.post(ORDER_API, order, config);
        return createdOrder;
    } catch (err) {
        console.log(err);
    }
}

export async function getSessionOrders(sessionId) {
    try {
        const sessionOrdersApi = `${ORDER_API}?sessionId=${sessionId}`;
        const { data: sessionOrders } = await axios.get(sessionOrdersApi, config);
        return sessionOrders;
    } catch (err) {
        console.log(err);
    }
}


