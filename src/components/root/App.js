import React from "react";
import { Container } from "reactstrap";
import Dashboard from "./Dashboard";
import Navi from "../navi/Navi";
import { Switch, Route } from "react-router-dom";
import CartDetail from "../cart/CartDetail"
import AddOrUpdateProduct from "../products/AddOrUpdateProduct"
import NotFound from "../common/NotFound"

function App() {
  return (
    <div>
      <Container>
        <Navi />
        <Switch>
          <Route path="/" exact component={Dashboard}></Route>
          <Route path="/cart" component={CartDetail}></Route>
          <Route path="/saveproduct/:productId" component={AddOrUpdateProduct}></Route>
          <Route path="/saveproduct" component={AddOrUpdateProduct}></Route>
          <Route  component={NotFound}></Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
