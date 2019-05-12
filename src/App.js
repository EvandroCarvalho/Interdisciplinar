import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom'
import SideBar from './container/sideBar/sideBar';

class App extends Component {
  render() {
    return (
        <div>
          <SideBar/>
        </div>
    )
  }
}
export default App;
