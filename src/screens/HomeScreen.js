
import React, { Component } from "react";
import Cart from "../components/Cart";
import Products from "../components/Products";
import Filter from "../components/Filter";

export default class HomeScreen extends Component {
    render() {
      return (
        <div>
          <div className="content">
            <div className="main">
              <Filter></Filter>
              <Products></Products>
            </div>
            <div className="sidebar">
              <Cart />
            </div>
          </div>
        </div>
      );
    }
  }