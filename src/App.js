import "./App.css";
import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import data from "./data.json";
// import HomeScreen from "./screens/HomeScreen";
// import AdminScreen from "./screens/AdminScreen";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Footer from "./components/Footer";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      size: "",
      sort: "",
    };
  }
  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter((x) => x._id !== product._id),
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems.filter((x) => x._id !== product._id))
    );
  };

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let inCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        inCart = true;
      }
    });
    if (!inCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ cartItems });

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="grid-container">
            <header className="text-center">
              <Link to="/">AlmostFreeBook.Com </Link> &nbsp; <a><i class='fas fa-user-graduate' style={{ fontSize: '24px', color:'blue'}}></i></a>
              {/* <Link to="/admin">Admin</Link> */}
            </header>
            <main>
              <div className="content">
                <div className="main">
                  <Products
                    products={this.state.products}
                    addToCart={this.addToCart}
                  ></Products>
                </div>
                <div className="sidebar">
                  <Cart
                    cartItems={this.state.cartItems}
                    removeFromCart={this.removeFromCart}
                    // addToCart={this.addToCart}
                  ></Cart>
                </div>
                {/* <Routes>
                  <Route path="/admin" element={AdminScreen} />
                  <Route path="/" element={<HomeScreen />} exact />
                </Routes> */}
              </div>
            </main>
            {/* <footer>All right is reserved.</footer> */}
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default App;
