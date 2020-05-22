import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase'


  const config = {
    apiKey: "AIzaSyDBOBJPcFkGtE4DsyXYqCMLHMXbOTjyD-A",
    authDomain: "business-model-innovator.firebaseapp.com",
    databaseURL: "https://business-model-innovator.firebaseio.com",
    projectId: "business-model-innovator",
    storageBucket: "business-model-innovator.appspot.com",
    messagingSenderId: "396002471600"
  };
  firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
