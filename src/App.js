import { Route, Switch } from "react-router-dom";
import Provider from "./context/Provider";
import Cart from "./pages/Cart";
// import Header from "./components/Header";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <Provider>
      {/* <Header /> */}
      <Switch>
        <Route path="/cart" component={ Cart } />
        <Route path="/productdetails/:id" component={ ProductDetails } />
        <Route path="/" component={ Home } />
      </Switch>
    </Provider>
  );
}

export default App;
