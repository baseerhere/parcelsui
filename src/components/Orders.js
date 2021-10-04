import React, { useEffect, useState } from 'react'

// for the api calls 
import { populateDishes, populateOrders, populateSessions } from '../service'

// mobx stuff
import Store from '../store'
import { observer } from 'mobx-react';
import { toJS } from 'mobx'

// lodash
import _ from 'lodash'

// inner components used
import Dish from './Dish';
import Session from './Session';
import SessionList from './SessionList';

const Orders = observer(() => {

    const allDishes = toJS(Store.dishes);
    const [filterCuisine, setCuisineFilter] = useState('All');

    useEffect(async () => {
        const { data: dishes } = await populateDishes();
        const { data: orders } = await populateOrders();
        const { data: sessions } = await populateSessions();
        Store.setDishes(dishes);
        Store.setOrders(orders);
        Store.setSessions(sessions);
    }, []);

    return (
        <div style={{ "textAlign": "left" }}>
            <div>
                <div className="cuisinesMenu">
                    {
                        _.map(toJS(Store.cuisines), cuisine => {
                            return (<button key={cuisine.CuisineName} name={cuisine.CuisineName}
                                onClick={e => setCuisineFilter(e.target.name)}
                                type="button" className={cuisine.Selected ? "btn " : "btn"}>{cuisine.CuisineName}</button>)
                        })
                    }
                </div>
            </div>
            <div className="parcel-wrapper">
                <div className="menusection">
                    {
                        _.chain(allDishes)
                            .filter(function (o) {
                                if (filterCuisine === 'All') {
                                    return true;
                                }
                                else {
                                    return o.cuisine === filterCuisine;
                                }
                            })
                            .sortBy(o => o.dishName)
                            .map(function (d) {
                                return <Dish key={d._id} price={d.price} dishid={d._id} dishName={d.dishName} fileName={d.fileName} />
                            })
                            .value()
                    }
                </div>
                <div>
                    <Session />
                </div>
                <div>
                    <SessionList />
                </div>
            </div>
        </div>

    )
})

export default Orders;