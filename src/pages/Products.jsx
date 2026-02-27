import useProducts from "../hooks/useProducts";

function Products() {
  const { products, loading } = useProducts();

  if (loading) return <p>Loading products...</p>;

  return (
    <div style={{ padding: "30px" }}>
      <h1>Products</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              width: "250px",
              boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>
              <strong>Price:</strong> KSh {product.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;