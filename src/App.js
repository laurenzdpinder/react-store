import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/productdetails/:id" component={ ProductDetails } />
        <Route path="/" component={ Home } />
      </Switch>
    </>
  );
}

export default App;
