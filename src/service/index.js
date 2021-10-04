import axios from 'axios'

const DISHES_API = `${process.env.REACT_APP_API_BASE_URL}\dishes`
const SESSION_API = `${process.env.REACT_APP_API_BASE_URL}\sessions`
const ORDER_API = `${process.env.REACT_APP_API_BASE_URL}\orders`
const CONFIG_HEADERS = {
    headers: {
        "Authorization": localStorage.getItem("authToken"),
    }
}

export async function populateDishes() {
    try {
        const { data: dishes } = await axios.get(DISHES_API, CONFIG_HEADERS);
        return dishes;
    } catch (err) {
        console.log(err);
    }
}

export async function populateSessions() {
    try {
        const { data: sessions } = await axios.get(SESSION_API, CONFIG_HEADERS);
        return sessions;
    } catch (err) {
        console.log(err);
    }
}

export async function updateStatusToKitchen(sessionId) {
    try {
        const sessionOrdersApi = `${SESSION_API}/${sessionId}`;
        const { data: output } = await axios.patch(sessionOrdersApi, { "sessionStatus": "inKitchen" }, CONFIG_HEADERS);
        return output;
    } catch (err) {
        console.log(err);
    }
}

export async function updateStatusToDelivered(sessionId) {
    try {
        const sessionOrdersApi = `${SESSION_API}/${sessionId}`;
        const { data: output } = await axios.patch(sessionOrdersApi, { "sessionStatus": "delivered" }, CONFIG_HEADERS);
        return output;
    } catch (err) {
        console.log(err);
    }
}

export async function populateOrders() {
    try {
        const { data: orders } = await axios.get(ORDER_API, CONFIG_HEADERS);
        return orders;
    } catch (err) {
        console.log(err);
    }
}

export async function createSession() {
    try {
        const { data: session } = await axios.post(SESSION_API, {}, CONFIG_HEADERS);
        return session;
    } catch (err) {
        console.log(err);
    }
}

export async function createOrder(order) {
    try {
        const { data: createdOrder } = await axios.post(ORDER_API, order, CONFIG_HEADERS);
        return createdOrder;
    } catch (err) {
        console.log(err);
    }
}

export async function getSessionOrders(sessionId) {
    try {
        const sessionOrdersApi = `${ORDER_API}?sessionId=${sessionId}`;
        const { data: sessionOrders } = await axios.get(sessionOrdersApi, CONFIG_HEADERS);
        return sessionOrders;
    } catch (err) {
        console.log(err);
    }
}

export async function buildCusines(dishes) {
    return _.chain(dishes)
        .reduce(function (acc, dish) {
            if (acc.findIndex((o) => o.CuisineName === dish.cuisine) === -1) {
                acc.push({ CuisineName: dish.cuisine, Selected: false });
            }
            return acc;
        }, [])
        .concat([{ CuisineName: "All", Selected: true }])
        .sortBy([o => o.CuisineName])
        .value();
}


