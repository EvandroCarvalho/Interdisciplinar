import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom'
import ResponsiveDrawer from './components/ResponsiveDrawer/ResponsiveDrawer'

class App extends Component {
  render() {
    return (
        <div>
          <ResponsiveDrawer/>
        </div>
    )
  }
}
export default App;
