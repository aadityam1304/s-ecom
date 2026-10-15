import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Store from "./pages/Store";
import About from "./pages/About";
import Cart from "./pages/Cart";

function App() {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cartItems");

      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to load cart:", error);
      return [];
    }
  });
  const [notification, setNotification] = useState("");

  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => {
      setNotification("");
    }, 1000);
  }, [notification]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  });

  function handleAddToCart(product) {
    const existingItem = cartItems.find((item) => item.id === product.id);

    // Check whether the stock limit has been reached
    if (
      product.stock <= 0 ||
      (existingItem && existingItem.quantity >= product.stock)
    ) {
      setNotification(
        `Out of stock! Maximum stock reached for ${product.name}.`,
      );
      return;
    }

    // Show a success message
    setNotification(`${product.name} added to cart!`);

    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCartItems((prevItems) => [...prevItems, { ...product, quantity: 1 }]);
    }
  }

  const totalCartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  function handleRemoveFromCart(productId) {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId),
    );
  }

  function handleChangeQuantity(productId, change) {
    const item = cartItems.find((item) => item.id === productId);

    if (!item) return;

    // Prevent quantity from exceeding available stock
    if (change > 0 && item.quantity >= item.stock) {
      setNotification(`Out of stock! Maximum stock reached for ${item.name}.`);
      return;
    }

    // Update the selected product's quantity
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + change }
          : item,
      ),
    );
  }

  function handleClearCart() {
    const shouldClear = window.confirm(
      "Are you sure you want to clear your cart?",
    );

    if (!shouldClear) return;

    setCartItems([]);
    setNotification("Cart cleared successfully!");
  }

  return (
    <BrowserRouter>
      <div className="app-layout">
        <Header cartQuantity={totalCartQuantity} />
        {notification && (
          <div
            className={`alert ${
              notification.startsWith("Out of stock!")
                ? "alert-danger"
                : "alert-success"
            } notification-toast text-center`}
            role="status"
          >
            {notification}
          </div>
        )}

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/store"
              element={<Store onAddToCart={handleAddToCart} />}
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cartItems}
                  onRemove={handleRemoveFromCart}
                  onChangeQuantity={handleChangeQuantity}
                  onClearCart={handleClearCart}
                />
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
