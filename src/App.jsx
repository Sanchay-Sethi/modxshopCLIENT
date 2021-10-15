import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";

import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import "./App.css"
import Error from "./pages/Error";

const App = () => {
    const user = useSelector(state=>state.user.currentUser);
    return(
        <Router>
            <Switch>
                <Route exact path = "/">
                    <Home/>
                </Route>
                <Route path = "/products/:category">
                    <ProductList/>
                </Route>
                <Route path = "/product/:id">
                    <Product/>
                </Route>
                <Route path = "/cart">
                    <Cart/>
                </Route>
                <Route path = "/success">
                    <Success/>
                </Route>
                <Route path = "/login">
                    {user ? <Redirect to = "/"/> : <Login/>}
                </Route>
                <Route path = "/register">
                    {user ? <Redirect to = "/"/> : <Register/>}
                </Route>
                <Route path = "/profile">
                    {!user ? <Redirect to = "/"/> : <Profile/>}
                </Route>
                <Route path = "*">
                    <Error/>
                </Route>
            </Switch>
        </Router>
    );
};
  
export default App;