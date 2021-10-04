import './App.css';

// hooks for re-rendering needs
import { useState, useEffect } from 'react';

// Feathers stuff
import io from 'socket.io-client';
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client';

// Components neeeded for this view
import Login from './components/Login';
import Header from './components/Header';
import Content from './components/Content';

// The mobx store reference
import Store from './store'
import { observer } from 'mobx-react';

const App = observer(() => {
  // storing the auth token in the local state
  const [authTokenFromLocalStorage, setAuthTokenFromLocalStorage] = useState('');

  // feathers-client related code for creating the featers-app, configuring the socket path and auth details.
  const socket = io(process.env.REACT_APP_API_BASE_URL);
  const client = feathers();
  client.configure(socketio(socket));
  client.configure(auth())

  const setToken = token => {
    localStorage.setItem('authToken', token);
    setAuthTokenFromLocalStorage(token);
  }

  useEffect(() => {
    setAuthTokenFromLocalStorage(localStorage.getItem("authToken"));

    if (localStorage.getItem("authToken")) {
      client.authenticate({
        strategy: 'jwt',
        type: 'token',
        accessToken: localStorage.getItem("authToken")
      }).then(response => {
        const ordersService = client.service('orders');
        const sessionsService = client.service('sessions');

        ordersService.on("created", createdOrder => Store.addNewOrder(createdOrder));
        sessionsService.on("created", createdSession => Store.addInOrderSession(createdSession));
        sessionsService.on("patched", patchedSession => Store.updateSessionStatus(patchedSession._id, patchedSession.sessionStatus));
      });
    }

  }, []);

  if (!authTokenFromLocalStorage) {
    return (
      <div className="App">
        <div className="container">
          <Login setToken={setToken} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Header setToken={setToken} />
        <main role="main" className="container">
          <p className="mt-4">&nbsp;</p>
          <Content />
        </main>
      </div>
    );
  }
})

export default App;
