import React from "react";
import {BrowserRouter,Route, Switch } from 'react-router-dom';
import Main from './Main'
import Visitor from './screens/Visitor'

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/visitor" component={Visitor} exact/>
      <Route component={Main} />
    </Switch>   
    </BrowserRouter>
  );
}

export default App;