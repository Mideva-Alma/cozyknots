import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import axios from "axios";

function Products() {
  const { products, setProducts, loading } = useProducts();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;

    return products.filter((p) => {
      const name = (p.name || "").toLowerCase();
      const category = (p.category || "").toLowerCase();
      const desc = (p.description || "").toLowerCase();
      return name.includes(q) || category.includes(q) || desc.includes(q);
    });
  }, [products, search]);

  if (loading) {
    return <p style={{ padding: "30px" }}>Loading products...</p>;
  }

  const handleEdit = (id) => navigate(`/edit/${id}`);

  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this product?");
    if (!ok) return;

    setDeletingId(id);
    try {
      await axios.delete(`http://localhost:3001/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Failed to delete:", err);
      alert("Failed to delete product.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <div style={headerRowStyle}>
          <div>
            <h1 style={titleStyle}>Products</h1>
            <p style={subTitleStyle}>Search and manage CozyKnots crochet items.</p>
          </div>

          <button
            onClick={() => navigate("/add-product")}
            style={primaryBtnStyle}
          >
            + Add Product
          </button>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, category, or description..."
          style={searchStyle}
        />

        {filteredProducts.length === 0 ? (
          <p style={{ marginTop: "20px" }}>
            No products match: <strong>{search}</strong>
          </p>
        ) : (
          <div style={gridStyle}>
            {filteredProducts.map((product) => (
              <div key={product.id} style={cardStyle}>
                <div>
                  <h3 style={{ margin: 0 }}>{product.name}</h3>
                  <p style={{ margin: "10px 0", color: "#444" }}>
                    {product.description}
                  </p>
                  <p style={{ margin: "0 0 6px 0" }}>
                    <strong>Category:</strong> {product.category}
                  </p>
                  <p style={{ margin: 0, color: "#ff6600", fontWeight: "bold" }}>
                    Price: KSh {product.price}
                  </p>
                </div>

                <div style={btnRowStyle}>
                  <button
                    onClick={() => handleEdit(product.id)}
                    style={editBtnStyle}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(product.id)}
                    disabled={deletingId === product.id}
                    style={{
                      ...deleteBtnStyle,
                      opacity: deletingId === product.id ? 0.7 : 1,
                      cursor: deletingId === product.id ? "not-allowed" : "pointer",
                    }}
                  >
                    {deletingId === product.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  backgroundColor: "#ffe6cc",
  padding: "40px 18px",
};

const containerStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
};

const headerRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "14px",
  flexWrap: "wrap",
};

const titleStyle = { margin: 0, color: "#222" };
const subTitleStyle = { margin: "8px 0 0 0", color: "#333" };

const searchStyle = {
  width: "100%",
  marginTop: "18px",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  outline: "none",
  fontSize: "16px",
  background: "white",
};

const gridStyle = {
  marginTop: "22px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "18px",
};

const cardStyle = {
  backgroundColor: "white",
  borderRadius: "12px",
  padding: "18px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  minHeight: "190px",
};

const btnRowStyle = {
  display: "flex",
  gap: "10px",
  marginTop: "16px",
};

const primaryBtnStyle = {
  padding: "10px 14px",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "#ff7a00",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

const editBtnStyle = {
  flex: 1,
  padding: "10px 12px",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "#ff7a00",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

const deleteBtnStyle = {
  flex: 1,
  padding: "10px 12px",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "#e66900",
  color: "white",
  fontWeight: "bold",
};

export default Products;

