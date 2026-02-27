import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import axios from "axios";

function Products() {
  const { products, setProducts, loading } = useProducts();
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState(null);

  if (loading) return <p style={{ padding: "30px", textAlign: "center" }}>Loading products...</p>;

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    setDeletingId(id);
    try {
      await axios.delete(`http://localhost:3001/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div style={{
      padding: "30px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "70vh"
    }}>
      <h1>Products</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "20px",
          width: "100%",
          maxWidth: "1200px"
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              backgroundColor: "#fff",
              boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>
                <strong>Price:</strong> KSh {product.price}
              </p>
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button
                onClick={() => handleEdit(product.id)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  color: "white",
                  fontWeight: "bold",
                  backgroundColor: "#ff7a00",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#e66900")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#ff7a00")}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                disabled={deletingId === product.id}
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  color: "white",
                  fontWeight: "bold",
                  backgroundColor: deletingId === product.id ? "#c45000" : "#e66900",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#c45000")}
                onMouseOut={(e) => (e.target.style.backgroundColor = deletingId === product.id ? "#c45000" : "#e66900")}
              >
                {deletingId === product.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;