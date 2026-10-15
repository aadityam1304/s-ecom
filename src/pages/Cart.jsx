import { useNavigate } from "react-router-dom";

function Cart({ cartItems, onRemove, onChangeQuantity, onClearCart }) {
  const navigate = useNavigate();
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div className="list-group">
          {cartItems.map((item) => (
            <div
              className="list-group-item d-flex justify-content-between align-items-center"
              key={item.id}
            >
              <span>{item.name}</span>
              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => onChangeQuantity(item.id, -1)}
                  disabled={item.quantity <= 1}
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => onChangeQuantity(item.id, 1)}
                  disabled={item.quantity >= item.stock}
                >
                  +
                </button>
              </div>
              <small className="text-muted">
                Remaining stock: {item.stock - item.quantity}
              </small>
              <span>Price: {item.price}</span>
              <span>₹{item.price * item.quantity}</span>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onRemove(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
          <h3 className="text-end mt-4">Total: ₹{totalPrice}</h3>
          <div className="text-end mt-3 ">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/store")}
            >
              Continue Shopping
            </button>
            <button
              className="btn btn-danger"
              onClick={onClearCart}
              disabled={cartItems.length === 0}
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
