import { useEffect, useState } from "react";
import products from "../data/products";

function Store({ onAddToCart }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Filter products by search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Sort the filtered products by price
  const sortedProducts = [...filteredProducts];

  if (sortOrder === "low-to-high") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "high-to-low") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  useEffect(() => {
    if (!selectedProduct) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setSelectedProduct(null);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProduct]);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-5">Store</h1>

      {/* Search and filters */}
      <div className="row mb-4">
        {/* Search and category: approximately 60% */}
        <div className="col-12 col-md-7">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <select
            className="form-select"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Music">Music</option>
            <option value="Clothing">T-Shirts</option>
            <option value="Accessories">Accessories</option>
            <option value="Phone">Phone</option>
          </select>
        </div>

        {/* Sorting: approximately 40% */}
        <div className="col-12 col-md-5">
          <select
            className="form-select"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
          >
            <option value="default">Default Order</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product count */}
      <p className="text-muted mb-3">
        Showing {sortedProducts.length} of {products.length} products
      </p>

      {/* No results message */}
      {sortedProducts.length === 0 && (
        <p className="text-center text-muted mt-4">
          No products found. Try a different search.
        </p>
      )}

      {/* Product grid */}
      <div className="row">
        {sortedProducts.map((product) => (
          <div className="col-12 col-sm-6 col-lg-4 mb-4" key={product.id}>
            <div className="card h-100">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
              />

              <div className="card-body text-center">
                <h5
                  className="card-title"
                  role="button"
                  onClick={() => setSelectedProduct(product)}
                >
                  {product.name}
                </h5>

                <p>₹{product.price.toLocaleString("en-IN")}</p>

                <button
                  className="btn btn-primary"
                  onClick={() => onAddToCart(product)}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        ))}

        {selectedProduct && (
          <div className="product-modal-backdrop">
            <div
              className="product-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="product-modal-title"
            >
              <button
                type="button"
                className="btn-close product-modal-close"
                aria-label="Close product details"
                onClick={() => setSelectedProduct(null)}
              />

              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="img-fluid product-modal-image"
              />

              <h3 id="product-modal-title">{selectedProduct.name}</h3>

              <p>Price: ₹{selectedProduct.price.toLocaleString("en-IN")}</p>

              <p>Category: {selectedProduct.category}</p>

              <p>Available stock: {selectedProduct.stock}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Store;
