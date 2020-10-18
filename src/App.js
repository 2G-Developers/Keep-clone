import React from 'react';
import './App.css';
import Index from './components/Index.jsx';
import { Provider } from 'react-redux'
import './style/main.scss'
import store from './redux/store'


function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <Index />
      </div>
    </Provider>
  );
}

export default App;
