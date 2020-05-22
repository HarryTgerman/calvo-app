import React, { Component } from 'react';
import Routes from './routes';
import './css//App.css';
import { Provider } from 'react-redux'

import store from './store';



export default class App extends Component {

  render() {
    return (
        <div className="App" >
          <header className="App-header">
          </header>
           <Provider store={store}>
              <Routes/>
            </Provider>
        </div>
    );
  }
}


