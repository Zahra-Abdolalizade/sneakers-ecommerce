import React, { useState } from "react";
import avatar from "./images/image-avatar.png";
import logo from "./images/logo.svg";
import cartLogo from "./images/icon-cart.svg";
import plus from "./images/icon-plus.svg";
import minus from "./images/icon-minus.svg";
import Delete from "./images/icon-delete.svg";

const product1 = [
  {
    id: 1,
    imageURL: "images/image-product-1-thumbnail.jpg",
    MainImageURL: "images/image-product-1.jpg",
  },
  {
    id: 2,
    imageURL: "images/image-product-2-thumbnail.jpg",
    MainImageUR: "images/image-product-1.jpg",
  },
  {
    id: 3,
    imageURL: "images/image-product-3-thumbnail.jpg",
    MainImageUR: "images/image-product-1.jpg",
  },
  {
    id: 4,
    imageURL: "images/image-product-4-thumbnail.jpg",
    MainImageUR: "images/image-product-1jpg",
  },
];

const productData = {
  title: "Fall Limited Edition Sneakers",
  description:
    "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",
  price: 250.0,
  off: 0.5,
};

function App() {
  const [count, setCount] = useState(0);
  const [addtoCart, setAddToCart] = useState(false);

  function handleReduceCount() {
    setCount(count > 0 ? count - 1 : 0);
  }
  function handleAddCount() {
    setCount(count + 1);
  }

  function handleAddtoCart() {
    setAddToCart(true);
  }

  function handleDeleteProduct() {
    setAddToCart(false);
    setCount(0);
  }
  return (
    <div className="app">
      <Nav
        count={count}
        addtoCart={addtoCart}
        OnDeleteProduct={handleDeleteProduct}
      />
      <Product
        OnAddCount={handleAddCount}
        OnReduceCount={handleReduceCount}
        count={count}
        OnAddtoCart={handleAddtoCart}
        addtoCart={addtoCart}
      />
    </div>
  );
}

function Nav({ count, addtoCart, OnDeleteProduct }) {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="brand">
          <img src={logo} alt="" />
        </div>
        <div className={`nav-elements  ${"active"}`}>
          <ul>
            <li>
              <a href="/collections">Collections</a>
            </li>
            <li>
              <a href="/men">Men</a>
            </li>
            <li>
              <a href="/women">Women</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>
        <div className="right-nav">
          <Cart
            count={count}
            addtoCart={addtoCart}
            OnDeleteProduct={OnDeleteProduct}
          />
          <Avatar />
        </div>
      </div>
    </nav>
  );
}

function Cart({ count, addtoCart, OnDeleteProduct }) {
  const [showCart, setShowCart] = useState(false);

  const handleCart = function () {
    setShowCart(!showCart);
  };

  return (
    <div className="cart-container">
      <div>
        <button className="cart" onClick={handleCart}>
          <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
              fill="#69707D"
              fill-rule="nonzero"
            />
          </svg>
          {addtoCart && !showCart && count > 0 && (
            <div className="notification">{count}</div>
          )}
        </button>
      </div>
      {showCart && (
        <div className="cart-box">
          <div className="cart-title">Cart</div>
          {count > 0 && addtoCart === true ? (
            <div className="checkout">
              <div className="cart-buy">
                <img src={product1[0].imageURL} alt="" className="cart-img" />

                <span>
                  <p>{productData.title}</p>
                  <p>
                    ${productData.price * productData.off} &#215; {count}{" "}
                    <h3>${count * productData.price * productData.off}</h3>
                  </p>
                </span>
                <button className="delete-product" onClick={OnDeleteProduct}>
                  <img src={Delete} alt="" />
                </button>
              </div>
              <button className="checkout-button">Checkout</button>
            </div>
          ) : (
            <div className="cart-buy">Your cart is empty.</div>
          )}
        </div>
      )}
    </div>
  );
}

function Avatar() {
  return (
    <div className="avatar">
      <img src={avatar} alt="avatar" />
    </div>
  );
}

function Product({ count, OnAddCount, OnReduceCount, OnAddtoCart, addtoCart }) {
  return (
    <div className="product-container">
      <ProductShow />
      <ProductDetails
        count={count}
        OnAddCount={OnAddCount}
        OnReduceCount={OnReduceCount}
        OnAddtoCart={OnAddtoCart}
        addtoCart={addtoCart}
      />
    </div>
  );
}

function ProductDetails({
  count,
  OnAddCount,
  OnReduceCount,
  OnAddtoCart,
  addtoCart,
}) {
  const product = productData;

  return (
    <div className="product-details">
      <h3>SNEAKER COMPANY</h3>
      <h1>{product.title}</h1>
      <p className="description">{product.description}</p>
      <div className="price">
        <h2>{`$${product.price * (1 - product.off)}.00`}</h2>
        <p>{`${product.off * 100}%`}</p>
      </div>
      <p className="org-price">{`$${product.price}.00`}</p>
      <div className="order">
        <div className="counter-button">
          <button className="pm" onClick={OnReduceCount}>
            <img src={minus} alt="" />
          </button>
          <span>{count}</span>
          <button className="pm" onClick={OnAddCount}>
            <img src={plus} alt="" />
          </button>
        </div>
        <button className="order-button" onClick={OnAddtoCart}>
          <img src={cartLogo} alt="" />
          <span>Add to cart</span>
        </button>
      </div>
    </div>
  );
}
function ProductShow() {
  const [selectedImage, setSelectedImage] = useState(1);
  function handleImage(id) {
    setSelectedImage(id);
  }

  return (
    <div className="product-show-container">
      <div>
        <img
          className="product-image"
          src={`images/image-product-${selectedImage}.jpg`}
          alt=" "
        />
      </div>
      <div className="catalog">
        {product1.map((image) => (
          <img
            className={`product-thumbnail ${
              image.id === selectedImage ? "selected" : ""
            }`}
            src={image.imageURL}
            alt=" "
            key={image.id}
            onClick={() => handleImage(image.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
